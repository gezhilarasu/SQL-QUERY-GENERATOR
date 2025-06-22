import React, { useState } from 'react';
import axios from 'axios';
import './main.css';

function Main() {
    const [question, setQuestion] = useState('');
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!question.trim()) return;
        
        setLoading(true);
        const currentQuestion = question;
        setQuestion('');
        const dbConfig = JSON.parse(sessionStorage.getItem('db_config'));
        if (!dbConfig) {
        alert('Database configuration not found. Please reconnect.');
        setLoading(false);
        return;
    }


        try {
            const res = await axios.post("https://sql-query-generator-3513.onrender.com/ask", { question: currentQuestion,db_config: dbConfig });
            
            const newConversation = {
                id: Date.now(),
                question: currentQuestion,
                query: res.data.query,
                results: res.data.results,
                timestamp: new Date().toLocaleString()
            };
            
            setConversations(prev => [newConversation, ...prev]);
        } catch (err) {
            alert(err.response?.data?.error || "Error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
        }
    };

    const exportToCSV = (results, filename = 'query_results.csv') => {
        if (!results || results.length === 0) return;
        
        const headers = Object.keys(results[0]);
        const csvContent = [
            headers.join(','),
            ...results.map(row => 
                headers.map(header => 
                    `"${String(row[header]).replace(/"/g, '""')}"`
                ).join(',')
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    const exportToExcel = (results, filename = 'query_results.xls') => {
        if (!results || results.length === 0) return;
        
        // Simple Excel export using HTML table format
        const headers = Object.keys(results[0]);
        let excelContent = '<table>';
        
        // Add headers
        excelContent += '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
        
        // Add data rows
        results.forEach(row => {
            excelContent += '<tr>' + headers.map(h => `<td>${row[h] || ''}</td>`).join('') + '</tr>';
        });
        
        excelContent += '</table>';
        
        const blob = new Blob([excelContent], { 
            type: 'application/vnd.ms-excel;charset=utf-8;' 
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    const clearHistory = () => {
        setConversations([]);
    };

    return (
        <div className="main-container">
            <header className="header">
                <h1 className="title">⚡ <span style={{color:"orange"}}>Query</span><span style={{color:"red"}}>Craft</span></h1>
                <p className="subtitle">Ask questions in natural language and get SQL results</p>
            </header>

            <div className="input-section">
                <div className="input-container">
                    <textarea 
                        value={question} 
                        onChange={e => setQuestion(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask your question here... (e.g., 'Show me all users from California')"
                        className="question-input"
                        rows="3"
                        disabled={loading}
                    />
                    <div className="input-actions">
                        <button 
                            onClick={handleAsk} 
                            disabled={loading || !question.trim()}
                            className="submit-btn"
                        >
                            {loading ? 'Processing...' : 'Ask Question'}
                        </button>
                        {conversations.length > 0 && (
                            <button onClick={clearHistory} className="clear-btn">
                                Clear History
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="conversations-container">
                {conversations.map((conv) => (
                    <div key={conv.id} className="conversation-item">
                        <div className="question-section">
                            <div className="question-header">
                                <span className="question-icon">Q</span>
                                <span className="timestamp">{conv.timestamp}</span>
                            </div>
                            <p className="question-text">{conv.question}</p>
                        </div>

                        <div className="response-section">
                            <div className="response-header">
                                <span className="response-icon">SQL</span>
                                <div className="response-actions">
                                    {conv.results && conv.results.length > 0 && (
                                        <>
                                            <button 
                                                onClick={() => exportToCSV(conv.results)}
                                                className="export-btn csv-btn"
                                            >
                                                Download CSV
                                            </button>
                                            <button 
                                                onClick={() => exportToExcel(conv.results)}
                                                className="export-btn excel-btn"
                                            >
                                                Download Excel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="sql-query">
                                <code>{conv.query}</code>
                            </div>
                            
                            {conv.results && conv.results.length > 0 ? (
                                <div className="results-section">
                                    <div className="results-header">
                                        <span className="results-count">
                                            {conv.results.length} result{conv.results.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="table-container">
                                        <table className="results-table">
                                            <thead>
                                                <tr>
                                                    {Object.keys(conv.results[0]).map((key) => (
                                                        <th key={key}>{key}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {conv.results.map((row, i) => (
                                                    <tr key={i}>
                                                        {Object.values(row).map((val, j) => (
                                                            <td key={j}>{val}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-results">
                                    <p>No results found</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {conversations.length === 0 && !loading && (
                <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <h3>No conversations yet</h3>
                    <p>Ask your first question to get started!</p>
                </div>
            )}
        </div>
    );
}

export default Main;