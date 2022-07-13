import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { getClinics, getPatients } from "../lib/crud";
import { IClinic, IPatient } from "../types/types";

const Home: NextPage<{ clinics: IClinic[] }> = ({ clinics }) => {
  const [clinic, setClinic] = React.useState<string>("");
  const [patients, setPatients] = React.useState<IPatient[]>([]);

  const onSelectClinic = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
    evt.preventDefault();

    const patientData = await getPatients(evt.target.value);
    setClinic(clinics[parseInt(evt.target.value) - 1].name);
    setPatients(patientData);
  };

  const onSortByLastName = () => {
    const sortedPatients = [...patients];
    sortedPatients.sort((a, b) => a.last_name.localeCompare(b.last_name));

    setPatients(sortedPatients);
  };

  const onSortByDOB = () => {
    const sortedPatients = [...patients];
    sortedPatients.sort(
      (a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth)
    );

    setPatients(sortedPatients);
  };

  const renderClinics = () => {
    return clinics.map((clinic) => {
      const { id, name } = clinic;
      return (
        <option value={id} key={id}>
          {name}
        </option>
      );
    });
  };

  const renderPatients = () => {
    return patients.map((patient) => {
      const { id, first_name, last_name, date_of_birth } = patient;
      return (
        <tr key={id}>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{date_of_birth}</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Salve Tech Test</title>
        <meta name="description" content="Salve Tech Test" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Salve Patient Dashboard</h1>

        <section className={styles.selectClinic}>
          <form>
            <label htmlFor="clinics">Please select a clinic:</label>
            <select
              name="clinics"
              id="clinics"
              defaultValue="0"
              onChange={onSelectClinic}
            >
              <option value="0" disabled>
                Choose here
              </option>
              {renderClinics()}
            </select>
          </form>
        </section>

        <section className={styles.patients}>
          {patients.length > 0 && (
            <>
              <div className={styles.sorting}>
                <button onClick={onSortByLastName}>Sort by last name</button>
                <button onClick={onSortByDOB}>Sort by date of birth</button>
              </div>
              <table className={styles.patientsTable}>
                <caption>{clinic}</caption>
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>{renderPatients()}</tbody>
              </table>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const clinics = await getClinics();

  return { props: { clinics } };
}

export default Home;
