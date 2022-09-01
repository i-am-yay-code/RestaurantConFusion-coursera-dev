import { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length < len)
const minLength = (len) => (val) => val && (val.length >= len);


export default class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    handleSubmit(values) {
        this.toggle()
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}><i className="fa fa-pencil" aria-hidden="true"></i> Submit comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Submit comment</ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <ModalBody>
                            <Row className='form-group mb-2'>
                                <Label htmlFor="Rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model='.rating' id="rating" name="rating"
                                        placeholder="Your rate"
                                        className='form-control'>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group mb-2'>
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                        type="name"
                                        placeholder="Your Name"
                                        className='form-control'
                                        model=".name"
                                        validators={{
                                            maxLength: maxLength(15),
                                            minLength: minLength(2)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        show='touched'
                                        model=".name"
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group mb-2'>
                                <Label htmlFor="Comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea rows={6} model='.comment' id="comment" name="comment"
                                        placeholder=" "
                                        className='form-control'
                                        validators={{
                                        }}
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Row className='form-group'>
                                <Button color="primary" type="submit">Submit</Button>{' '}
                            </Row>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
            </div >
        );
    }
}