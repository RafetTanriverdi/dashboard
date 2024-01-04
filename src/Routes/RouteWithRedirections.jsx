/* eslint-disable react/prop-types */

export function RouteWithRedirections({ ...props }) {
  return <>{props.children}</>; //Not redirect user are inside and authanticated
}
