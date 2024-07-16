import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Col, Image, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LogoBlue from "../../images/Logo-blue.png";
import RegistrImage from "../../images/RegisterImg.png";

import "./Registration.css";

export default function Registr() {
    return (
        <div className="position-relative">
            <Image src={LogoBlue} className="registr-logo" />
            <Row className="registr-div align-items-center justify-content-center">
                <Col sm={12} md={4}>
                    <div className="registr-form">
                        <Form>
                            <p className="registr-wlcm">Xoş gəldin!</p>
                            <h2 className="registr-header">Qeydiyyat</h2>
                            <p className="registr-text">Lorem Ipsum is simply</p>
                            <Form.Group className="mb-4" controlId="formBasicName">
                                <Form.Label>Ad və soyadınız</Form.Label>
                                <Form.Control type="text" placeholder="Adınızı və soyadınızı daxil edin" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Mail ünvanı</Form.Label>
                                <Form.Control type="email" placeholder="Mail ünvanınızı daxil edin" />
                            </Form.Group>

                            <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                                <Form.Label>Şifrə</Form.Label>
                                <Form.Control type="password" placeholder="Şifrənizi daxil edin" />
                                <FontAwesomeIcon className="pass-eye" icon={faEyeSlash} />
                            </Form.Group>
                            <Form.Group className="mb-3 position-relative" controlId="formBasicForgotPassword">
                                <Form.Label>Şifrənizi təkrarlayın</Form.Label>
                                <Form.Control type="password" placeholder="Şifrənizi təkrarlayın" />
                                <FontAwesomeIcon className="pass-eye" icon={faEyeSlash} />
                            </Form.Group>

                            <Button className="registr-button" type="submit">
                                Qeydiyyat
                            </Button>
                        </Form>
                        <p className="notRegistr">Hesabınız var? <span>Giriş</span></p>
                    </div>
                </Col>
                <Col md={6} className="d-none d-md-block">
                    <div style={{ marginLeft: "48px" }}>
                        <Image src={RegistrImage} className="w-100" />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
