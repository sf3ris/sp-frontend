import React, { useState } from 'react';
import { IMember } from '../../../features/members/models/IMember';
import Checkbox from '@material-ui/core/Checkbox';

interface IMemberRow {
    member: IMember;
    onChecked: ( member: IMember, checked: boolean ) => void;
    isChecked: boolean;
}

const MemberRow: React.FC<IMemberRow> = props => {

    const [ checked, setIsChecked ] = useState<boolean>(props.isChecked);

    const handleChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {

        const value = e.target.checked;

        setIsChecked( value );
        props.onChecked( props.member, value );

    }

    return (

        <div style={{width:'100%'}}>

            <p>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    />

                    {props.member.name} {props.member.last_name}
            </p>

        </div>

    )

}

export default MemberRow;
