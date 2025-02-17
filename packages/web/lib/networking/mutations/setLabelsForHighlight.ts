import { gql } from 'graphql-request'
import { Label, labelFragment } from '../fragments/labelFragment'
import { gqlFetcher } from '../networkHelpers'

export type SetLabelsForHighlightResult = {
  setLabelsForHighlight: SetLabelsForHighlight
}

type SetLabelsForHighlight = {
  labels: Label[]
  errorCodes?: unknown[]
}

export async function setLabelsForHighlight(
  highlightId: string,
  labelIds: string[]
): Promise<Label[] | undefined> {
  const mutation = gql`
    mutation SetLabelsForHighlight($input: SetLabelsForHighlightInput!) {
      setLabelsForHighlight(input: $input) {
        ... on SetLabelsSuccess {
          labels {
            ...LabelFields
          }
        }
        ... on SetLabelsError {
          errorCodes
        }
      }
    }
    ${labelFragment}
  `

  console.log(
    'setting label for highlight id: ',
    highlightId,
    'labelIds',
    labelIds
  )

  try {
    const data = (await gqlFetcher(mutation, {
      input: { highlightId, labelIds },
    })) as SetLabelsForHighlightResult
    console.log(' -- errorCodes', data.setLabelsForHighlight.errorCodes)

    return data.setLabelsForHighlight.errorCodes
      ? undefined
      : data.setLabelsForHighlight.labels
  } catch (error) {
    console.log('setLabelsForHighlightInput error', error)
    return undefined
  }
}
