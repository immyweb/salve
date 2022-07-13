import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type { NextApiRequest, NextApiResponse } from "next";
import { IClinic } from "../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IClinic[]>
) {
  const csvDirectory = path.join(process.cwd(), "db");
  const file = await fs.createReadStream(`${csvDirectory}/clinics.csv`);

  let csv;
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      csv = results.data;
      res.status(200).json(csv);
    },
  });
}
