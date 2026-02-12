import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const failures = [];

const read = (relativePath) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const walkFiles = (dir, extensions, output = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, extensions, output);
      continue;
    }
    if (extensions.includes(path.extname(entry.name))) {
      output.push(fullPath);
    }
  }
  return output;
};

const html = read("public/index.html");
if (/href\s*=\s*["']\.\.\//i.test(html)) {
  failures.push(
    "public/index.html: parent-relative asset path found (e.g., href=\"../...\")."
  );
}
if (!/Content-Security-Policy/i.test(html)) {
  failures.push(
    "public/index.html: missing Content-Security-Policy declaration."
  );
}
if (!/name\s*=\s*["']referrer["']/i.test(html)) {
  failures.push("public/index.html: missing Referrer-Policy meta.");
}

const css = read("src/index.css");
if (/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(css)) {
  failures.push("src/index.css: remote Google Fonts import detected.");
}

const sourceFiles = walkFiles(
  path.join(projectRoot, "src"),
  [".js", ".jsx", ".ts", ".tsx"]
);

for (const fullPath of sourceFiles) {
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const targetBlankTags = fileContent.match(
    /<[^>]*target\s*=\s*["']_blank["'][^>]*>/g
  );
  if (!targetBlankTags) continue;

  for (const tag of targetBlankTags) {
    const relAttrMatch = tag.match(/rel\s*=\s*["']([^"']+)["']/i);
    if (!relAttrMatch) {
      failures.push(
        `${path.relative(
          projectRoot,
          fullPath
        )}: target=\"_blank\" without rel attribute.`
      );
      continue;
    }

    const relValue = relAttrMatch[1].toLowerCase();
    if (!relValue.includes("noopener") || !relValue.includes("noreferrer")) {
      failures.push(
        `${path.relative(
          projectRoot,
          fullPath
        )}: target=\"_blank\" missing noopener/noreferrer in rel.`
      );
    }
  }
}

if (failures.length) {
  console.error("Security checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Security checks passed.");
