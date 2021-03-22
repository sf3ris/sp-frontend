import React from 'react'
import { shallow } from 'enzyme'
import MemberToolbarComponent from '../../../src/component/member/Table/memberToolbar.component'

describe('Member toolbar component', () => {
  const onNewFn = jest.fn()
  const onPdf = jest.fn()
  const onImport = jest.fn()

  it('Should match snapshot', () => {
    const wrapper = shallow(
            <MemberToolbarComponent
                onImportModal={onImport}
                onPDF={onPdf}
                onNew={onNewFn} />
    )

    expect(wrapper.debug()).toMatchSnapshot()
  })

  it('Should trigger new', () => {
    const wrapper = shallow(
            <MemberToolbarComponent
                onImportModal={onImport}
                onPDF={onPdf}
                onNew={onNewFn} />
    )

    const button = wrapper.find('#idNewButtonMemberTable')
    button.simulate('click')

    expect(onNewFn).toBeCalled()
  })

  it('Should open pdf modal', () => {
    const wrapper = shallow(
            <MemberToolbarComponent
                onImportModal={onImport}
                onPDF={onPdf}
                onNew={onNewFn} />
    )

    const button = wrapper.find('#idPDFButtonMemberTable')
    button.simulate('click')

    expect(wrapper.find('MemberPDFModal').prop('isOpen')).toBe(true)
  })
})
