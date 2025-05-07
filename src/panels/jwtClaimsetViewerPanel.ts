import {
  Disposable,
  Uri,
  ViewColumn,
  Webview,
  WebviewPanel,
  window,
} from 'vscode';
import { getActiveTextEditorFilename } from '../utils/getFilename';
import { getNonce } from '../utils/getNonce';
import { getUri } from '../utils/getUri';

export class JwtClaimsetViewerPanel {
  private static _claimset: object;
  public static readonly currentPanel: JwtClaimsetViewerPanel | undefined;
  private readonly _panel: WebviewPanel;
  private readonly _disposables: Disposable[] = [];
  private readonly _extensionUri: Uri;

  /**
   * The JwtClaimsetViewerPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    this._setPanelIcon();

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Set the HTML content for the webview panel
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri
    );

    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview);
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static render(extensionUri: Uri, claimset: object) {
    //Check that we have a valid object
    if (claimset === undefined) {
      return;
    }
    const activeFilename = `${getActiveTextEditorFilename(
      'jwt-token'
    )}-claimset`;

    if (JwtClaimsetViewerPanel.currentPanel) {
      JwtClaimsetViewerPanel.currentPanel._panel.dispose();
    }
    // If a webview panel does not already exist create and show a new one
    const panel = window.createWebviewPanel(
      'showPreviewClaimset',
      activeFilename,
      ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [Uri.joinPath(extensionUri, 'out')],
      }
    );
    JwtClaimsetViewerPanel.currentPanel = new JwtClaimsetViewerPanel(
      panel,
      extensionUri
    );
    JwtClaimsetViewerPanel._claimset = claimset;
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    JwtClaimsetViewerPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _setPanelIcon() {
    const iconPathOnDisk = Uri.joinPath(
      this._extensionUri,
      'assets',
      'showClaimsetPreviewCommand.png'
    );
    this._panel.iconPath = iconPathOnDisk;
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the React webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    const stylesUri = getUri(webview, extensionUri, [
      'out',
      'webview',
      'index.css',
    ]);
    const scriptUri = getUri(webview, extensionUri, [
      'out',
      'webview',
      'index.js',
    ]);

    const nonce = getNonce();

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src * 'self' data: https:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Claimset</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'onDidInitialize': {
            JwtClaimsetViewerPanel.currentPanel?._panel.webview.postMessage(
              JwtClaimsetViewerPanel._claimset
            );
            return;
          }
          case 'alert': {
            window.showErrorMessage(message.text);
            return;
          }
          default: {
            window.showInformationMessage(message.text);
            return;
          }
        }
      },
      null,
      this._disposables
    );
  }
}
