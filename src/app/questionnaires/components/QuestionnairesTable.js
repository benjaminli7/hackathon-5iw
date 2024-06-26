"use client";
import { Button, Table } from "@mantine/core";
import Link from "next/link";


function QuestionnairesTable({ questionnaires }) {
  const rows = questionnaires.map((questionnaire) => (
    <Table.Tr key={questionnaire.title}>
      <Table.Td>{questionnaire.id}</Table.Td>
      <Table.Td>{questionnaire.title}</Table.Td>
      <Table.Td>{questionnaire.description}</Table.Td>
      <Table.Td>{questionnaire.questions.length}</Table.Td>
      <Table.Td>
        <Link href={`/questionnaires/${questionnaire.id}`}>
          <Button variant="outline">Voir</Button>
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table horizontalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Titre</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Nb questions</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default QuestionnairesTable;
