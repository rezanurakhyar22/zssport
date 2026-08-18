const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const SRC_DB = process.env.SRC_DB
  ? path.resolve(process.env.SRC_DB)
  : path.resolve("./zsport1.db");
const DST_DB = process.env.DST_DB
  ? path.resolve(process.env.DST_DB)
  : path.resolve("./zsport.db");

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) =>
      err ? reject(err) : resolve(rows || []),
    );
  });
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function escapeIdent(name) {
  // SQLite identifier escaping using double-quotes
  return String(name).replace(/"/g, '""');
}

(async () => {
  const srcDb = new sqlite3.Database(SRC_DB);
  const dstDb = new sqlite3.Database(DST_DB);

  try {
    const tables = await all(
      srcDb,
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;`,
    );

    const tableNames = tables.map((t) => t.name);

    if (tableNames.length === 0) {
      console.log("[import] No user tables found in source DB.");
      return;
    }

    console.log("[import] Source DB:", SRC_DB);
    console.log("[import] Destination DB:", DST_DB);
    console.log("[import] Tables:", tableNames.join(", "));

    await run(dstDb, "BEGIN TRANSACTION;");

    for (const table of tableNames) {
      const t = escapeIdent(table);
      // Overwrite behavior: clear destination table first
      await run(dstDb, `DELETE FROM "${t}";`);
    }

    for (const table of tableNames) {
      const t = escapeIdent(table);

      // Get column names
      const cols = await all(dstDb, `PRAGMA table_info("${t}");`);
      // If destination does not yet have the table, create it based on source schema
      if (cols.length === 0) {
        const schemaRow = await all(
          srcDb,
          `SELECT sql FROM sqlite_master WHERE type='table' AND name=?;`,
          [table],
        );
        const createSql = schemaRow?.[0]?.sql;
        if (!createSql)
          throw new Error(
            `Cannot find schema for missing table ${table} in source DB.`,
          );
        await run(dstDb, createSql);
      }

      const srcCols = await all(srcDb, `PRAGMA table_info("${t}");`);
      const colNames = srcCols.map((c) => c.name);

      if (colNames.length === 0) continue;

      const colList = colNames.map((c) => `"${escapeIdent(c)}"`).join(",");
      const placeholders = colNames.map(() => "?").join(",");

      const rows = await all(srcDb, `SELECT * FROM "${t}";`);
      console.log(`[import] ${table}: ${rows.length} rows`);

      for (const row of rows) {
        const values = colNames.map((c) => row[c]);
        await run(
          dstDb,
          `INSERT INTO "${t}" (${colList}) VALUES (${placeholders});`,
          values,
        );
      }
    }

    await run(dstDb, "COMMIT;");
    console.log("[import] Done.");
  } catch (e) {
    try {
      await run(dstDb, "ROLLBACK;");
    } catch (_) {
      // ignore
    }
    console.error("[import] Failed:", e);
    process.exitCode = 1;
  } finally {
    srcDb.close();
    dstDb.close();
  }
})();
