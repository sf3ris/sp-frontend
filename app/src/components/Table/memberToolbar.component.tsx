import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

interface IMemberToolbarComponentProps {
    onNew: (...args : any) => void
}

const MemberToolbarComponent : React.FC<IMemberToolbarComponentProps> = props => {

    return (

        <Grid container >

            <Grid item xs={12}>

                <Button id="idNewButtonMemberTable" onClick={props.onNew} color="primary">
                    <FontAwesomeIcon icon={faPlusSquare} /> <span style={{marginLeft:'5px'}}>New</span>
                </Button>

            </Grid>

        </Grid>


    )

}

export default MemberToolbarComponent;