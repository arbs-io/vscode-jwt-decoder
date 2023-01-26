import { useCallback, useEffect, useState } from 'react'
import {
  VSCodeDataGrid,
  VSCodeDataGridCell,
  VSCodeDataGridRow,
  VSCodeBadge,
} from '@vscode/webview-ui-toolkit/react'
import { ITokenListItem, tokenListItems } from './utilities/tokenListItems'
import './App.css'

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

  let abc: ITokenListItem[] = []
  if (state !== undefined) {
    abc = tokenListItems(JSON.stringify(state.data))
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
        {abc.map((claim) => {
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
