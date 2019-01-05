const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $username: String!) {
    addUseer(email: $email, password: $password, username: $username) {
      token
    }
  }`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`
