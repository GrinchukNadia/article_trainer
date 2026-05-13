import words from "../features/data/Data";

// export default function SqlPreview() {
//   const sql = words
//     .map((word) => {
//       const genders = Array.isArray(word.gender)
//         ? word.gender
//         : [word.gender];

//       const genderSql = `ARRAY[${genders
//         .map((g) => `'${g}'`)
//         .join(", ")}]`;

//       return `INSERT INTO words (lemma, gender, plural, translation, level)
// VALUES ('${word.lemma}', ${genderSql}, '${
//         word.plural ?? ""
//       }', '${word.translation ?? ""}', ${word.level ?? 1});`;
//     })
//     .join("\n\n");

//     const duplicates = words.reduce<Record<string, number>>((acc, word) => {
//   const key = word.lemma.trim().toLowerCase();

//   acc[key] = (acc[key] ?? 0) + 1;

//   return acc;
// }, {});

// const repeated = Object.entries(duplicates)
//   .filter(([, count]) => count > 1)
//   .sort((a, b) => b[1] - a[1]);

// console.log(repeated);

//   return (
//     <div style={{ padding: 20 }}>
//       <textarea
//         value={sql}
//         readOnly
//         style={{
//           width: "100%",
//           height: "80vh",
//           fontFamily: "monospace",
//         }}
//       />
//     </div>
//   );
// }


//sql запрос для создания переводов слов из файла дата и подсказок
export function crSql(words: any) {
  function escapeSql(value:any) {
  return String(value).replaceAll("'", "''");
}

function splitTranslations(text:any) {
  const result = [];
  let current = "";
  let depth = 0;

  for (const char of text) {
    if (char === "(") depth++;
    if (char === ")") depth--;

    if (char === "," && depth === 0) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

function parseTranslation(text:any) {
  const match = text.match(/^(.+?)\s*\((.+)\)$/);

  if (!match) {
    return {
      translation: text.trim(),
      usageNote: null,
    };
  }

  return {
    translation: match[1].trim(),
    usageNote: match[2].trim(),
  };
}

const values:any = [];

for (const word of words) {
  if (!word.translation) continue;

  const translations = splitTranslations(word.translation);

  translations.forEach((part, index) => {
    const parsed = parseTranslation(part);

    values.push(
      `('${escapeSql(word.lemma)}', 'ru', '${escapeSql(parsed.translation)}', ${index + 1}, ${
        parsed.usageNote ? `'${escapeSql(parsed.usageNote)}'` : "NULL"
      })`
    );
  });
}

const sql = `
INSERT INTO word_translations
(word_id, language_code, translation, priority, usage_note)
SELECT
  w.id,
  v.language_code,
  v.translation,
  v.priority,
  v.usage_note
FROM (
  VALUES
  ${values.join(",\n  ")}
) AS v(lemma, language_code, translation, priority, usage_note)
JOIN words w ON w.lemma = v.lemma;
`;

console.log(sql);
}
