import { Title } from '@mantine/core'
import React from 'react'

function Question({ question, isYoung }) {
  isYoung = true;
  const titleClass = isYoung ? '' : 'text-8xl font-semibold text-red-800';
  return (
    <Title order={1} className={titleClass}>
      {question.text}
    </Title>
  )
}

export default Question