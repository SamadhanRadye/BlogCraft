import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Form } from 'react-bootstrap';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    useEffect(() => {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        setBlogs(savedBlogs);
    }, []);

    const deleteBlog = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const updatedBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(updatedBlogs);
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "All" || blog.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ marginTop: '56px', padding: '20px' }}>
            <div className="container">
                <h1 className="mb-4 text-center">📚 My Blog Collection</h1>
                
                {/* Search and Filter */}
                <div className="row mb-4">
                    <div className="col-md-8">
                        <Form.Control
                            id="searchInput1"
                            type="text"
                            placeholder="🔍 Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <Form.Select id="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Business">Business</option>
                        </Form.Select>
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="row">
                    {filteredBlogs.length === 0 ? (
                        <div className="col-12 text-center">
                            <h3>📝 No blogs found</h3>
                            <p>Start writing your first blog!</p>
                        </div>
                    ) : (
                        filteredBlogs.map(blog => (
                            <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="text-truncate">{blog.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            By {blog.author} | {blog.createdAt}
                                        </Card.Subtitle>
                                        <Badge bg="primary" className="mb-2">{blog.category}</Badge>
                                        <Card.Text className="text-truncate" style={{maxHeight: '60px', overflow: 'hidden'}}>
                                            {blog.content}
                                        </Card.Text>
                                        <div className="mb-2">
                                            <small className="text-muted">
                                                📝 {blog.wordCount} words | ⏱️ {blog.readingTime} min read
                                            </small>
                                        </div>
                                        <div className="mb-2">
                                            {blog.tags && blog.tags.map((tag, index) => (
                                                <Badge key={index} bg="secondary" className="me-1">{tag}</Badge>
                                            ))}
                                        </div>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className="d-flex justify-content-between">
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedBlog(blog);
                                                    setShowModal(true);
                                                }}
                                            >
                                                👀 Read
                                            </Button>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => deleteBlog(blog.id)}
                                            >
                                                🗑️ Delete
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Blog Read Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBlog?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBlog && (
                        <>
                            <div className="mb-3">
                                <strong>Author:</strong> {selectedBlog.author}<br/>
                                <strong>Category:</strong> <Badge bg="primary">{selectedBlog.category}</Badge><br/>
                                <strong>Created:</strong> {selectedBlog.createdAt}<br/>
                                <strong>Reading Time:</strong> {selectedBlog.readingTime} minutes
                            </div>
                            {selectedBlog.tags && (
                                <div className="mb-3">
                                    <strong>Tags:</strong> {selectedBlog.tags.map((tag, index) => (
                                        <Badge key={index} bg="secondary" className="me-1">{tag}</Badge>
                                    ))}
                                </div>
                            )}
                            <hr/>
                            <div style={{whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>
                                {selectedBlog.content}
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BlogList;