import React, { useState } from 'react'
import { IMember } from '../../../features/members/models/IMember'
import { Checkbox, Form } from 'semantic-ui-react'
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox'

interface IMemberRow {
    member: IMember;
    onChecked: (member: IMember, checked: boolean) => void;
    isChecked: boolean;
}

const MemberRow: React.FC<IMemberRow> = props => {
  const [checked, setIsChecked] = useState<boolean>(props.isChecked)

  const handleChange = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const value = data.checked as boolean
    setIsChecked(value)
    props.onChecked(props.member, value)
  }

  return (
        <Form.Field>
            <Checkbox
                toggle
                checked={checked}
                onChange={handleChange}
                label={<label>{props.member.last_name} {props.member.name}</label>}
                />
        </Form.Field>
  )
}

export default MemberRow
