import { Title } from '@mantine/core'
import React from 'react'

function Question({ question }) {
  return (
    <Title order={3}>{question.text}</Title>
  )
}

export default Question