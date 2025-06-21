import './Landing.css';
import{useNavigate} from 'react-router-dom';

function Landing() {
    const navigate=useNavigate();
    const handledatabaseConnection=()=>{
        navigate('/databaseconnection');
    }
    return (
        <div className="landing-container">
            {/* Header Section */}
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <h2>QueryCraft</h2>
                    </div>
                    <nav className="nav">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#examples">Examples</a>
                        <button className="cta-button" onClick={handledatabaseConnection}>Get Started</button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Connect, Query & <span className="highlight">Download</span>
                        </h1>
                        <p className="hero-description">
                            Connect your database, describe what you need in plain English, and get instant results. 
                            Execute AI-generated queries directly on your data and download results as CSV files.
                        </p>
                        <div className="hero-buttons">
                            <button className="primary-button" onClick={handledatabaseConnection}>Connect Database</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="code-preview">
                            <div className="code-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="code-content">
                                <p><span className="comment">// Connected to: sales_database</span></p>
                                <p><span className="keyword">SELECT</span> customer_name, total_spent</p>
                                <p><span className="keyword">FROM</span> customer_analytics</p>
                                <p><span className="keyword">WHERE</span> total_spent &gt; <span className="number">1000</span></p>
                                <p><span className="comment">// ✅ 25 rows returned</span></p>
                                <p><span className="comment">// 📥 Downloaded as customers_high_value.csv</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title">Why Choose SQLGen?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔌</div>
                            <h3>Direct Database Connection</h3>
                            <p>Securely connect to your hosted databases using your credentials. Works with MySQL, PostgreSQL, and more.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🤖</div>
                            <h3>AI-Powered Queries</h3>
                            <p>Transform natural language into SQL queries and execute them directly on your connected database.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Instant Results</h3>
                            <p>See query results immediately in a user-friendly table format. No need to switch between tools.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📥</div>
                            <h3>CSV Download</h3>
                            <p>Export your query results as CSV files for further analysis, reporting, or sharing with your team.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Connect Your Database</h3>
                            <p>Enter your database credentials (host, database name, username, password, port) to establish a secure connection to your hosted database.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Describe What You Need</h3>
                            <p>Type your request in plain English: "Show me all customers from last month" - our AI converts it to SQL and executes it.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>View & Download Results</h3>
                            <p>See your query results instantly in a clean table format, then download them as CSV files for further use.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Examples Section */}
            <section id="examples" className="examples">
                <div className="container">
                    <h2 className="section-title">See It In Action</h2>
                    <div className="examples-grid">
                        <div className="example-card">
                            <h4>Database Connection</h4>
                            <p className="example-input">Enter your database credentials</p>
                            <div className="example-output">
                                <code>Host: your-db-server.com<br/>Database: sales_db<br/>Port: 3306<br/>✅ Connected Successfully!</code>
                            </div>
                        </div>
                        <div className="example-card">
                            <h4>Natural Language Query</h4>
                            <p className="example-input">"Show me top 10 customers by total orders"</p>
                            <div className="example-output">
                                <code>SELECT customer_name, COUNT(*) as total_orders FROM orders GROUP BY customer_id ORDER BY total_orders DESC LIMIT 10;</code>
                            </div>
                        </div>
                        <div className="example-card">
                            <h4>Instant Results & Download</h4>
                            <p className="example-input">Query executed successfully!</p>
                            <div className="example-output">
                                <code>📊 Results: 10 rows returned<br/>📥 Download as CSV<br/>💾 Export complete</code>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Query Your Database?</h2>
                    <p>Connect your database and start getting insights in minutes, not hours</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>SQLGen</h4>
                            <p>Connect your database, query with natural language, and download results instantly.</p>
                        </div>
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#examples">Examples</a>
                        </div>
                        <div className="footer-section">
                            <h4>Support</h4>
                            <a href="#">Documentation</a>
                            <a href="#">Help Center</a>
                            <a href="#">Contact Us</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 SQLGen. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;