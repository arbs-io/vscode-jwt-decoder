import tokenFirewall from '../assets/token-firewall.png'
import tokenOpenid from '../assets/token-openid.png'
import tokenKey from '../assets/token-key.png'
import tokenSpy from '../assets/token-spy.png'
import tokenTimestamps from '../assets/token-timestamps.png'

export interface ITokenListItem {
  claimIcon: string
  claimName: string
  claimValue: string | undefined
  claimDescription: string
}
export interface ITokenListState {
  items: ITokenListItem[]
}

function convertToISOString(isoString: number | undefined) {
  try {
    if (isoString === undefined) {
      return undefined
    }
    const isoDate = new Date(1e3 * isoString).toISOString()
    return isoDate
  } catch (error) {
    return undefined
  }
}

export function tokenListItems(accessToken: string): ITokenListItem[] {
  const list: Array<ITokenListItem> = []

  try {
    const json = JSON.parse(accessToken)

    // Check for empty json
    if (Object.keys(json).length === 0) {
      return list
    }

    list.push(
      //Token timestamps
      {
        claimIcon: tokenTimestamps,
        claimName: 'auth_time',
        claimValue: convertToISOString(json.auth_time),
        claimDescription:
          'The time at which a user last entered credentials, represented in epoch time. There is no discrimination between that authentication being a fresh sign-in, a single sign-on (SSO) session, or another sign-in type. The auth_time is the last time the application (or user) initiated an authentication attempt against Azure AD B2C. The method used to authenticate is not differentiated.',
      },
      {
        claimIcon: tokenTimestamps,
        claimName: 'exp',
        claimValue: convertToISOString(json.exp),
        claimDescription:
          'The time at which the token becomes invalid, represented in epoch time. Your application should use this claim to verify the validity of the token lifetime.',
      },
      {
        claimIcon: tokenTimestamps,
        claimName: 'iat',
        claimValue: convertToISOString(json.iat),
        claimDescription:
          'The time at which the token was issued, represented in epoch time.',
      },
      {
        claimIcon: tokenTimestamps,
        claimName: 'nbf',
        claimValue: convertToISOString(json.nbf),
        claimDescription:
          'The time at which the token becomes valid, represented in epoch time. This time is usually the same as the time the token was issued. Your application should use this claim to verify the validity of the token lifetime.',
      },
      //Identity Provider Info
      {
        claimIcon: tokenSpy,
        claimName: 'aud',
        claimValue: json.aud,
        claimDescription:
          "Identifies the intended recipient of the token. For Azure AD B2C, the audience is the application ID. Your application should validate this value and reject the token if it doesn't match. Audience is synonymous with resource.",
      },
      {
        claimIcon: tokenSpy,
        claimName: 'aio',
        claimValue: json.aio,
        claimDescription: 'an internal claim used by Azure AD',
      },
      {
        claimIcon: tokenSpy,
        claimName: 'alg',
        claimValue: json.alg,
        claimDescription: 'the algorithm used for signing the JWT',
      },
      {
        claimIcon: tokenSpy,
        claimName: 'iss',
        claimValue: json.iss,
        claimDescription:
          'Identifies the security token service (STS) that constructs and returns the token. It also identifies the directory in which the user was authenticated. Your application should validate the issuer claim to make sure that the token came from the appropriate endpoint.',
      },
      {
        claimIcon: tokenSpy,
        claimName: 'idp',
        claimValue: json.idp,
        claimDescription:
          'the identity provider that authenticated the subject of the JWT',
      },
      {
        claimIcon: tokenSpy,
        claimName: 'nonce',
        claimValue: json.nonce,
        claimDescription:
          'A nonce is a strategy used to mitigate token replay attacks. Your application can specify a nonce in an authorization request by using the nonce query parameter. The value you provide in the request is emitted unmodified in the nonce claim of an ID token only. This claim allows your application to verify the value against the value specified on the request. Your application should perform this validation during the ID token validation process.',
      },
      //Token metadata
      {
        claimIcon: tokenKey,
        claimName: 'ver',
        claimValue: json.ver,
        claimDescription: 'indicates the version of the id_token',
      },
      {
        claimIcon: tokenKey,
        claimName: 'c_hash',
        claimValue: json.c_hash,
        claimDescription:
          'A code hash included in an ID token only when the token is issued together with an OAuth 2.0 authorization code. A code hash can be used to validate the authenticity of an authorization code. For more information about how to perform this validation',
      },
      {
        claimIcon: tokenKey,
        claimName: 'at_hash',
        claimValue: json.c_hash,
        claimDescription:
          'An access token hash included in an ID token only when the token is issued together with an OAuth 2.0 access token. An access token hash can be used to validate the authenticity of an access token. For more information about how to perform this validation',
      },
      {
        claimIcon: tokenKey,
        claimName: 'sub',
        claimValue: json.sub,
        claimDescription:
          'The principal about which the token asserts information, such as the user of an application. This value is immutable and cannot be reassigned or reused. It can be used to perform authorization checks safely, such as when the token is used to access a resource. By default, the subject claim is populated with the object ID of the user in the directory.',
      },
      {
        claimIcon: tokenKey,
        claimName: 'acr',
        claimValue: json.acr,
        claimDescription:
          'the "Authentication context class" claim. Used only with older policies.',
      },
      {
        claimIcon: tokenKey,
        claimName: 'tfp',
        claimValue: json.tfp,
        claimDescription:
          '	The name of the policy that was used to acquire the ID token.',
      },
      {
        claimIcon: tokenKey,
        claimName: 'scp',
        claimValue: json.scp,
        claimDescription:
          'The permissions granted to the resource for an access token. Multiple granted permissions are separated by a space. An array of strings representing the OAuth scopes granted for the JWT',
      },
      {
        claimIcon: tokenKey,
        claimName: 'azp',
        claimValue: json.azp,
        claimDescription:
          'The application ID of the client application that initiated the request.',
      },
      {
        claimIcon: tokenKey,
        claimName: 'azpacr',
        claimValue: json.azpacr,
        claimDescription:
          'The application ID of the client application that initiated the request.',
      },
      //Token Crypto
      {
        claimIcon: tokenKey,
        claimName: 'amr',
        claimValue: json.amr,
        claimDescription:
          'identifies how the subject of the token was authenticated',
      },
      {
        claimIcon: tokenKey,
        claimName: 'appid',
        claimValue: json.appid,
        claimDescription: 'the application ID of the client using the token',
      },
      {
        claimIcon: tokenKey,
        claimName: 'appidacr',
        claimValue: json.appidacr,
        claimDescription: 'indicates how the client was authenticated',
      },
      {
        claimIcon: tokenKey,
        claimName: 'crit',
        claimValue: json.crit,
        claimDescription:
          'list of headers that must be understood by the server in order to accept the token as valid',
      },
      {
        claimIcon: tokenKey,
        claimName: 'cty',
        claimValue: json.cty,
        claimDescription: 'the content type, should be "JWT"',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'jti',
        claimValue: json.jti,
        claimDescription:
          'unique identifier of the token even amont different issuers',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'kid',
        claimValue: json.kid,
        claimDescription:
          'the thumbprint for the public key used to verify this token',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'kty',
        claimValue: json.kty,
        claimDescription:
          'the key type, that is the algorithm family, used to sign the JWT',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'oid',
        claimValue: json.oid,
        claimDescription:
          'a identifier that uniquely identifies the user/subject of the JWT across applications',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'onprem_sid',
        claimValue: json.onprem_sid,
        claimDescription: 'the SID of the user for on-premise authentication',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'rh',
        claimValue: json.rh,
        claimDescription:
          'an internal claim used by Azure to revalidate tokens',
      },
      {
        claimIcon: tokenFirewall,
        claimName: 'roles',
        claimValue: json.roles,
        claimDescription:
          'the set of roles that were assigned to the user who is logging in',
      },

      //Token Identity
      {
        claimIcon: tokenOpenid,
        claimName: 'tid',
        claimValue: json.tid,
        claimDescription:
          'a GUID that represents the Azure AD tenant that the user is from',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'typ',
        claimValue: json.typ,
        claimDescription: 'always set to "JWT"',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'uti',
        claimValue: json.uti,
        claimDescription:
          'an internal claim used by Azure to revalidate tokens',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'wids',
        claimValue: json.wids,
        claimDescription: 'denotes the tenant-wide roles assigned to the user',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'x5c',
        claimValue: json.x5c,
        claimDescription:
          'certificate chain corresponding to the private key used to generate the token signature',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'x5t',
        claimValue: json.x5t,
        claimDescription:
          'the thumbprint of the certificate used for signing the JWT',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'x5u',
        claimValue: json.x5u,
        claimDescription:
          'a URL where the server can retrieve a certificate chain corresponding to the private key used to generate the token signature',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'emails',
        claimValue: json.emails,
        claimDescription: 'the mail address for the identity owner',
      },
      {
        claimIcon: tokenOpenid,
        claimName: 'name',
        claimValue: json.name,
        claimDescription: 'the name for the identity owner',
      }
    )
  } catch (error) {
    console.log(error)
  }
  return list.filter((item) => item.claimValue)
}
