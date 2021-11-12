import axios from 'axios'
import { Dropbox } from 'dropbox'
import { useRouter } from 'next/router'
import { InputHTMLAttributes, useContext, useRef, useState } from 'react'
import { Button, Dropdown, Form, Input, InputGroupProps, InputPickerProps } from 'rsuite'
import styles from '../src/components/Signin/signin.module.css'
import AppStore from '../contexts/store'
const Signin = () => {
    const [userName, setUserName] = useState(null)
    const inputValue = useRef<any>(null)
    const passwordValue = useRef<any>(null)
    const router = useRouter()
    const store = useContext(AppStore)
    const hanleInformation = async () => {
        if (!userName || !passwordValue.current) alert('نام کاربری و رمز عبور را وارد کنید.')

        const dropBox = new Dropbox({ accessToken: process.env.TOKEN })
        const res = await dropBox.usersGetCurrentAccount()
        axios.post('/api/login', {
            username: userName,
            password: passwordValue.current.value
        }).then((res: any) => {
            if (res.data.success) {
                sessionStorage['isAuth'] = true
                store.setAuth(true)
                console.log(store);
                router.push('/')
            }
        }
        ).catch(e => {
            alert('نام کاربری یا زمر عبور اشتباه است.')
        })
    }

    return (
        <article className={styles.signinPage}>
            <h5>دراپ باکس سپریس</h5>
            <br />
            <br />
            <Form layout="inline">
                <Form.Group controlId="username-7">
                    <Dropdown onSelect={(e) => setUserName(e)} title={userName || "نام کاربری را انتخاب کنید"} className={styles.userNameDropdown} >
                        <Dropdown.Item eventKey='mahvash'>مهوش</Dropdown.Item>
                        <Dropdown.Item eventKey='nahid'>ناهید</Dropdown.Item>
                        <Dropdown.Item eventKey='sara'>سارا</Dropdown.Item>
                        <Dropdown.Item eventKey='talayeh'>طلایه</Dropdown.Item>
                    </Dropdown>
                </Form.Group>

                <Form.Group controlId="password-7">
                    <Form.ControlLabel>رمز عبور</Form.ControlLabel>
                    <Input ref={passwordValue} name="password" type="password" style={{ width: 160 }} />
                </Form.Group>

                <Button onClick={hanleInformation}>ورود</Button>
            </Form>
        </article >
    )
}

export default Signin
