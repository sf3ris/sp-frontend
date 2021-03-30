import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { useHistory } from 'react-router-dom'
import { faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout, IUserState } from '../../shared/user/slices/userSlices'
import { RootState } from '../../core/rootReducer'
import { Container, Grid } from 'semantic-ui-react'

const Header : React.FC<{}> = props => {
  const history = useHistory()

  const dispatch = useDispatch()

  const user : IUserState = useSelector(
    (state : RootState) => state.userState
  )

  const onUserClick = () => {
    history.push('/profile')
  }

  const onLogout = () => {
    dispatch(logout(null))
  }

  return (

      <Container>
          <Grid centered container columns="equal">
              <Grid.Column width={3} floated="right">
                  <section className="search-and-user">
                      <div className="admin-profile">

                          <span className="greeting">{ user.user && user.user.username }</span>
                          <div onClick={onUserClick} className="notifications">
                              <span className="badge">0</span>
                              <FontAwesomeIcon icon={faUserCircle} />
                          </div>

                          <div onClick={onUserClick} style={{ marginLeft: '2vw' }}>
                              <FontAwesomeIcon onClick={onLogout} icon={faSignOutAlt} />
                          </div>

                      </div>
                  </section>
              </Grid.Column>
          </Grid>
      </Container>

  )
}

export default Header
