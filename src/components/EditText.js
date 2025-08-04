import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditText() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("Technology");
    const [tags, setTags] = useState("");
    const [fontSize, setFontSize] = useState("16");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [textAlign, setTextAlign] = useState("left");
    const [lineHeight, setLineHeight] = useState("1.5");
    const [customColor, setCustomColor] = useState("#000000");
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [savedBlogs, setSavedBlogs] = useState(JSON.parse(localStorage.getItem('blogs') || '[]'));
    
    // Text formatting states
    const [textColor, setTextColor] = useState("black");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const contentRef = useRef(null);

    const sidebarStyle = {
        position: "fixed",
        top: "56px",
        left: "0",
        width: "280px",
        height: "calc(100vh - 56px)",
        backgroundColor: "#f8f9fa",
        padding: "15px",
        overflowY: "auto",
        zIndex: "1000",
        borderRight: "2px solid #dee2e6"
    };

    const contentStyle = {
        marginLeft: "280px",
        padding: "30px",
        backgroundColor: "#ffffff",
        minHeight: "calc(100vh - 56px)"
    };

    const editorStyle = {
        width: '100%',
        minHeight: '400px',
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: fontSize + 'px',
        fontFamily: fontFamily,
        textAlign: textAlign,
        lineHeight: lineHeight,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        textDecoration: `${isUnderline ? 'underline' : ''} ${isStrikethrough ? 'line-through' : ''}`,
        border: '1px solid #ced4da',
        borderRadius: '8px',
        padding: '15px',
        resize: 'vertical'
    };

    const buttonStyle = {
        width: "100%",
        marginBottom: "8px",
        fontSize: "14px"
    };

    const smallButtonStyle = {
        width: "48%",
        marginBottom: "8px",
        fontSize: "12px"
    };

    // Text formatting functions
    const handleColorChange = (color) => setTextColor(color);
    const handleBgColorChange = (color) => setBackgroundColor(color);
    const toggleBold = () => setIsBold(!isBold);
    const toggleItalic = () => setIsItalic(!isItalic);
    const toggleUnderline = () => setIsUnderline(!isUnderline);
    const toggleStrikethrough = () => setIsStrikethrough(!isStrikethrough);

    // Text transformation functions
    const handleUppercase = () => setContent(content.toUpperCase());
    const handleLowercase = () => setContent(content.toLowerCase());
    const handleCapitalize = () => {
        setContent(content.replace(/\b\w/g, char => char.toUpperCase()));
    };

    // Utility functions
    const insertTemplate = (template) => {
        const templates = {
            intro: "Welcome to my blog! Today I want to share with you...\n\n",
            conclusion: "\n\nThank you for reading! Feel free to share your thoughts in the comments below.",
            quote: "\n\n> \"Insert your inspiring quote here\" - Author Name\n\n"
        };
        setContent(content + templates[template]);
    };

    const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
    const charCount = content.length;
    const readingTime = Math.ceil(wordCount / 200);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            alert("Please add both title and content before saving!");
            return;
        }

        const newBlog = {
            id: Date.now(),
            title,
            content,
            author: author || "Anonymous",
            category,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            createdAt: new Date().toLocaleString(),
            wordCount,
            readingTime
        };

        const updatedBlogs = [...savedBlogs, newBlog];
        setSavedBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        
        alert("Blog saved successfully!");
        // Reset form
        setTitle("");
        setContent("");
        setAuthor("");
        setTags("");
    };

    const handleExport = () => {
        const blogData = {
            title,
            content,
            author: author || "Anonymous",
            category,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            createdAt: new Date().toLocaleString(),
            wordCount,
            readingTime
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blogData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${title || 'blog'}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div style={{ display: 'flex', marginTop: '56px' }}>
            {/* Enhanced Sidebar */}
            <div style={sidebarStyle}>
                <h5 className="mb-3 text-primary">📝 Blog Editor Tools</h5>
                
                {/* Quick Actions */}
                <div className="mb-3">
                    <h6 className="mb-2">🚀 Quick Actions</h6>
                    <div className="d-flex justify-content-between">
                        <Button variant="success" style={smallButtonStyle} onClick={handleSave}>
                            💾 Save
                        </Button>
                        <Button variant="info" style={smallButtonStyle} onClick={handleExport}>
                            📤 Export
                        </Button>
                    </div>
                </div>

                <hr />

                {/* Text Formatting */}
                <div className="mb-3">
                    <h6 className="mb-2">✨ Text Formatting</h6>
                    <div className="d-flex justify-content-between mb-2">
                        <Button 
                            variant={isBold ? "dark" : "outline-dark"} 
                            style={smallButtonStyle}
                            onClick={toggleBold}
                        >
                            <strong>B</strong>
                        </Button>
                        <Button 
                            variant={isItalic ? "dark" : "outline-dark"} 
                            style={smallButtonStyle}
                            onClick={toggleItalic}
                        >
                            <em>I</em>
                        </Button>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <Button 
                            variant={isUnderline ? "dark" : "outline-dark"} 
                            style={smallButtonStyle}
                            onClick={toggleUnderline}
                        >
                            <u>U</u>
                        </Button>
                        <Button 
                            variant={isStrikethrough ? "dark" : "outline-dark"} 
                            style={smallButtonStyle}
                            onClick={toggleStrikethrough}
                        >
                            <s>S</s>
                        </Button>
                    </div>
                </div>

                {/* Font Settings */}
                <div className="mb-3">
                    <h6 className="mb-2">🎨 Font Settings</h6>
                    <Form.Group className="mb-2">
                        <Form.Label style={{fontSize: '12px'}}>Font Family</Form.Label>
                        <Form.Select size="sm" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                            <option value="Arial">Arial</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Courier New">Courier New</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-between mb-2">
                        <div style={{width: '48%'}}>
                            <Form.Label style={{fontSize: '12px'}}>Size</Form.Label>
                            <Form.Select size="sm" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                                <option value="12">12px</option>
                                <option value="14">14px</option>
                                <option value="16">16px</option>
                                <option value="18">18px</option>
                                <option value="20">20px</option>
                                <option value="24">24px</option>
                            </Form.Select>
                        </div>
                        <div style={{width: '48%'}}>
                            <Form.Label style={{fontSize: '12px'}}>Align</Form.Label>
                            <Form.Select size="sm" value={textAlign} onChange={(e) => setTextAlign(e.target.value)}>
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                                <option value="justify">Justify</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>

                {/* Color Settings */}
                <div className="mb-3">
                    <h6 className="mb-2">🌈 Colors</h6>
                    <Button 
                        variant="outline-primary" 
                        style={buttonStyle}
                        onClick={() => setShowColorPicker(true)}
                    >
                        🎨 Custom Color Picker
                    </Button>
                    
                    <div className="row g-1 mb-2">
                        {['#000000', '#dc3545', '#198754', '#0d6efd', '#ffc107', '#6f42c1'].map(color => (
                            <div key={color} className="col-4">
                                <div 
                                    style={{
                                        width: '100%',
                                        height: '25px',
                                        backgroundColor: color,
                                        cursor: 'pointer',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                    onClick={() => handleColorChange(color)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text Transform */}
                <div className="mb-3">
                    <h6 className="mb-2">🔄 Transform Text</h6>
                    <Button variant="primary" size="sm" style={buttonStyle} onClick={handleUppercase}>
                        UPPERCASE
                    </Button>
                    <Button variant="secondary" size="sm" style={buttonStyle} onClick={handleLowercase}>
                        lowercase
                    </Button>
                    <Button variant="info" size="sm" style={buttonStyle} onClick={handleCapitalize}>
                        Capitalize
                    </Button>
                </div>

                {/* Templates */}
                <div className="mb-3">
                    <h6 className="mb-2">📄 Quick Templates</h6>
                    <Button variant="outline-success" size="sm" style={buttonStyle} onClick={() => insertTemplate('intro')}>
                        📝 Intro Template
                    </Button>
                    <Button variant="outline-warning" size="sm" style={buttonStyle} onClick={() => insertTemplate('quote')}>
                        💬 Quote Template
                    </Button>
                    <Button variant="outline-danger" size="sm" style={buttonStyle} onClick={() => insertTemplate('conclusion')}>
                        🏁 Conclusion Template
                    </Button>
                </div>

                {/* Statistics */}
                <div className="mt-3 p-2" style={{backgroundColor: '#e9ecef', borderRadius: '8px'}}>
                    <h6 className="mb-2">📊 Statistics</h6>
                    <small>
                        <div>📝 Words: {wordCount}</div>
                        <div>🔤 Characters: {charCount}</div>
                        <div>⏱️ Reading Time: {readingTime} min</div>
                    </small>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={contentStyle}>
                <div className="container-fluid">
                    <h1 className="mb-4 text-center">✍️ Blog Editor</h1>
                    
                    {/* Blog Metadata */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label><strong>📰 Blog Title</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your amazing blog title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{fontSize: '18px', padding: '12px'}}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label><strong>👤 Author</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your name"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label><strong>📂 Category</strong></Form.Label>
                                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Technology">Technology</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                    <option value="Health">Health</option>
                                    <option value="Education">Education</option>
                                    <option value="Business">Business</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label><strong>🏷️ Tags (comma separated)</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="react, javascript, web development"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {/* Main Editor */}
                    <Form.Group className="mb-4">
                        <Form.Label><strong>✏️ Blog Content</strong></Form.Label>
                        <Form.Control
                            as="textarea"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing your amazing blog post here... 

Tell your story, share your knowledge, inspire your readers!"
                            style={editorStyle}
                        />
                    </Form.Group>

                    {/* Preview Section */}
                    <div className="mt-5">
                        <h2 className="mb-3">👀 Preview</h2>
                        <div style={{
                            border: '2px dashed #dee2e6',
                            borderRadius: '12px',
                            padding: '30px',
                            backgroundColor: '#f8f9fa',
                            minHeight: '200px'
                        }}>
                            {title && <h1 className="mb-3" style={{color: '#495057'}}>{title}</h1>}
                            {author && <p className="text-muted mb-3">By {author} | {category} | {new Date().toLocaleDateString()}</p>}
                            {tags && (
                                <div className="mb-3">
                                    {tags.split(',').map((tag, index) => (
                                        <span key={index} className="badge bg-primary me-2">{tag.trim()}</span>
                                    ))}
                                </div>
                            )}
                            <div style={{
                                ...editorStyle,
                                border: 'none',
                                backgroundColor: 'white',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {content || "Your blog content will appear here..."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Color Picker Modal */}
            <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>🎨 Custom Color Picker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <Form.Label><strong>Text Color</strong></Form.Label>
                        <Form.Control
                            type="color"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                        />
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={() => {
                            handleColorChange(customColor);
                            setShowColorPicker(false);
                        }}
                    >
                        Apply Color
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditText;

