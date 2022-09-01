import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
import CommentForm from "./CommentForm";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components'


class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.dish != null) {

            const RenderComments = ({ comments, addComment, dishId }) => {
                if (comments != null) {
                    const commentList = [];
                    comments.forEach(comment => {
                        commentList.push(
                            <Fade in>
                                <li key={commentList.length} className="mb-2">{comment.comment}<br />
                                    --- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}

                                </li>
                            </Fade>
                        );
                    });

                    return (
                        <div>
                            <h4 className="mb-3">Comments</h4>
                            <ul className="list-unstyled">
                                <Stagger in>
                                    {commentList}
                                </Stagger>

                            </ul>
                            <CommentForm
                                dishId={dishId}
                                addComment={addComment} />
                        </div>
                    );
                }
                else {
                    return (
                        <div></div>
                    );
                }
            }

            const RenderDish = ({ dish }) => {
                let imageUrlTemp = baseUrl + dish.image;
                let imageUrl = imageUrlTemp.replace("/assets/images/", "").replace("images/", "");
                console.log(imageUrl)
                if (dish != null)
                    return (
                        <FadeTransform in
                            transformProps={{
                                exitTransform: "translateY(-20%)"
                            }}>
                            <Card>
                                <CardImg top src={imageUrl} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform >
                    );
                else
                    return (
                        <div></div>
                    );
            }

            return (

                <div className="container" >
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>

                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments}
                                addComment={this.props.addComment}
                                dishId={this.props.dish.id} />
                        </div>
                    </div>
                </div>
            );


        }


    }
}




export default DishDetail;

