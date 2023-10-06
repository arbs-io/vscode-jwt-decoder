import { useCallback, useEffect, useState } from 'react'
import {
  VSCodeDataGrid,
  VSCodeDataGridCell,
  VSCodeDataGridRow,
  VSCodeBadge,
} from '@vscode/webview-ui-toolkit/react'
import { ITokenListItem, tokenListItems } from './utilities/tokenListItems'
import './App.css'

// function processInput(input: string): string {
//   try {
//     // Try to parse the input as JSON
//     const arr = JSON.parse(input)

//     // Check if the parsed input is an array
//     if (Array.isArray(arr)) {
//       // Join the array elements with a newline and return
//       return arr.join('zzzzz\n')
//     }
//   } catch (error) {
//     // If an error is thrown, the input is not a valid JSON array
//     // Just ignore the error
//   }

//   // If the input is not a JSON array, return it as is
//   return input
// }
function processInput(input: string): string {
  // Check if the input looks like a JSON array
  if (/^\s*\[.*\]\s*$/.test(input)) {
    // If it does, parse it as JSON and join the elements with a newline
    return JSON.parse(input).join('aaaaaaaaa\n')
  }

  // If the input does not look like a JSON array, return it as is
  return input
}

function App() {
  const [state, setState] = useState<MessageEvent>()
  const onMessageReceivedFromIframe = useCallback(
    (event: MessageEvent) => {
      console.log('onMessageReceivedFromIframe', event)
      setState(event)
    },
    [state]
  )

  useEffect(() => {
    window.addEventListener('message', onMessageReceivedFromIframe)
    return () =>
      window.removeEventListener('message', onMessageReceivedFromIframe)
  }, [onMessageReceivedFromIframe])

  const tokenData: ITokenListItem[] = []
  if (state !== undefined) {
    const tempTokenData: ITokenListItem[] = tokenListItems(
      JSON.stringify(state.data)
    )
    tempTokenData.forEach((element) => {
      if (element.claimValue) {
        console.log('element.claimName', element.claimName)
        console.log('element.claimName', element.claimValue)
        console.log('element.isArray', Array.isArray(element.claimValue))
        if (Array.isArray(element.claimValue)) {
          let stringArray = ''
          element.claimValue.sort().forEach((claimItem) => {
            stringArray = stringArray + `🏷️ ${claimItem}\n`
          })
          element.claimValue = stringArray
        } else {
          element.claimValue = processInput(element.claimValue)
        }
      }
      tokenData.push(element)
    })
  }

  return (
    <main>
      <VSCodeDataGrid
        gridTemplateColumns="150px 450px"
        aria-label="SubscriptionStatus"
      >
        <VSCodeDataGridRow rowType="sticky-header">
          <VSCodeDataGridCell cellType="columnheader" gridColumn="1">
            Claim
          </VSCodeDataGridCell>
          <VSCodeDataGridCell cellType="columnheader" gridColumn="2">
            Value
          </VSCodeDataGridCell>
          <VSCodeDataGridCell cellType="columnheader" gridColumn="3">
            Description
          </VSCodeDataGridCell>
        </VSCodeDataGridRow>
        {tokenData.map((claim) => {
          return (
            <VSCodeDataGridRow key={`row_${claim.claimName}`}>
              <VSCodeDataGridCell
                key={`claimName_${claim.claimName}`}
                gridColumn="1"
              >
                <img
                  src={claim.claimIcon}
                  alt={'logo'}
                  style={{ height: 16, width: 16, marginRight: 8 }}
                />
                <VSCodeBadge>{claim.claimName}</VSCodeBadge>
              </VSCodeDataGridCell>
              <VSCodeDataGridCell
                style={{ whiteSpace: 'pre-line' }}
                key={`claimValue_${claim.claimName}`}
                gridColumn="2"
              >
                {claim.claimValue}
              </VSCodeDataGridCell>
              <VSCodeDataGridCell
                key={`claimDescription_${claim.claimName}`}
                gridColumn="3"
              >
                {claim.claimDescription}
              </VSCodeDataGridCell>
            </VSCodeDataGridRow>
          )
        })}
      </VSCodeDataGrid>
    </main>
  )
}

export default App
