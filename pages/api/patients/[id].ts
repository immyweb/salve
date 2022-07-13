import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPatient } from "../../../types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPatient[]>
) {
  const csvDirectory = path.join(process.cwd(), "db");
  const file = await fs.createReadStream(
    `${csvDirectory}/patients-${req.query.id}.csv`
  );

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
