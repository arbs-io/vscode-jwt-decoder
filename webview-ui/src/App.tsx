import { useCallback, useEffect, useState } from 'react'
import { vscode } from './utilities/vscode'
import {
  VSCodeDataGrid,
  VSCodeDataGridCell,
  VSCodeDataGridRow,
  VSCodeBadge,
} from '@vscode/webview-ui-toolkit/react'
import { ITokenListItem, tokenListItems } from './utilities/tokenListItems'
import './App.css'

// let token = `{"exp": 1662593853}`
// useEffect(() => {
//   const handleMessage = (event: { data: string }) => {
//     console.log('handleMessage')
//     token = event.data
//   }

//   window.addEventListener('message', handleMessage)

//   return () => {
//     window.removeEventListener('message', handleMessage)
//   }
// }, [])

// const token = `{
//   "exp": 1662593853,
//   "nbf": 1662590253,
//   "ver": "1.0",
//   "iss": "https://apistudioaad.b2clogin.com/b1da9890-e814-4034-bb99-7c081b15da66/v2.0/",
//   "sub": "60df718f-5de2-4f21-b30d-d87798a2b45b",
//   "aud": "0d7f4abb-6556-43a3-b98f-d5ac1e8c7676",
//   "nonce": "4925868c-c2f7-48d9-87a6-6497e4946048",
//   "iat": 1662590253,
//   "auth_time": 1662590248,
//   "oid": "60df718f-5de2-4f21-b30d-d87798a2b45b",
//   "name": "Andrew",
//   "emails": [
//       "butsona@arbs.io"
//   ],
//   "tfp": "B2C_1_SignIn"
// }`

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
            <VSCodeDataGridRow>
              <VSCodeDataGridCell gridColumn="1">
                <img
                  src={claim.claimIcon}
                  alt={'logo'}
                  style={{ height: 16, width: 16, marginRight: 8 }}
                />
                <VSCodeBadge>{claim.claimName}</VSCodeBadge>
              </VSCodeDataGridCell>
              <VSCodeDataGridCell gridColumn="2">
                {claim.claimValue}
              </VSCodeDataGridCell>
              <VSCodeDataGridCell gridColumn="3">
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
