import React, { useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

interface ILoginComponentProps {
    onLogin : (username : string, password: string) => void;
}

const LoginComponent : React.FC<ILoginComponentProps> = props => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onLogin = () => props.onLogin(username, password)

  return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ width: '30vw', height: '30vh', marginTop: '35vh', marginLeft: '35vw' }}>
                <Form>
                    <Form.Field>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            />
                    </Form.Field>
                    <Form.Field>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </Form.Field>
                    <Button
                        style={{ width: '100%' }}
                        primary
                        onClick={onLogin}
                    >Login</Button>
                </Form>
            </div>
        </div>
  )
}

export default LoginComponent
