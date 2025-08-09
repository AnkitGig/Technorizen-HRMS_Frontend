
import React, { useState } from 'react';
import { applyLeave, getLeave } from '../api/api';

const Leave = () => {
	const [form, setForm] = useState({
		leaveType: '',
		startDate: '',
		endDate: '',
		reason: '',
	});
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [leaves, setLeaves] = useState([]);
	const [fetching, setFetching] = useState(false);
	// Fetch leave applications on mount
	React.useEffect(() => {
		const fetchLeaves = async () => {
			setFetching(true);
			try {
				const token = localStorage.getItem('token');
				const data = await getLeave(token);
				setLeaves(Array.isArray(data) ? data : data.leaves || []);
			} catch (error) {
				// Optionally handle error
			}
			setFetching(false);
		};
		fetchLeaves();
	}, []);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

		const handleSubmit = async (e) => {
			e.preventDefault();
			setLoading(true);
			setMessage('');
			try {
				const token = localStorage.getItem('token');
				await applyLeave(form, token);
				setMessage('Leave applied successfully!');
				setForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
				// Refresh leave list after applying
				const data = await getLeave(token);
				setLeaves(Array.isArray(data) ? data : data.leaves || []);
			} catch (error) {
				setMessage(error.message || 'Error applying leave.');
			}
			setLoading(false);
		};

		   return (
			   <div style={{ width: '100%', padding: 32, background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', boxShadow: '0 8px 32px rgba(60, 72, 100, 0.12)' }}>
				   <h2 style={{ textAlign: 'center', color: '#3b3b5c', fontWeight: 700, marginBottom: 32, letterSpacing: 1 }}>Apply for Leave</h2>
				   <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(60,72,100,0.07)', marginBottom: 32 }}>
					   <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
						   <div style={{ flex: 1 }}>
							   <label style={{ fontWeight: 500, color: '#3b3b5c' }}>Leave Type</label>
							   <select name="leaveType" value={form.leaveType} onChange={handleChange} required style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 6, border: '1px solid #c7d2fe', background: '#f1f5ff' }}>
								   <option value="">Select Type</option>
								   <option value="Sick">Sick</option>
								   <option value="Casual">Casual</option>
								   <option value="Earned">Earned</option>
								   <option value="Other">Other</option>
							   </select>
						   </div>
						   <div style={{ flex: 1 }}>
							   <label style={{ fontWeight: 500, color: '#3b3b5c' }}>Start Date</label>
							   <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 6, border: '1px solid #c7d2fe', background: '#f1f5ff' }} />
						   </div>
						   <div style={{ flex: 1 }}>
							   <label style={{ fontWeight: 500, color: '#3b3b5c' }}>End Date</label>
							   <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 6, border: '1px solid #c7d2fe', background: '#f1f5ff' }} />
						   </div>
					   </div>
					   <div style={{ marginBottom: 20 }}>
						   <label style={{ fontWeight: 500, color: '#3b3b5c' }}>Reason</label>
						   <textarea name="reason" value={form.reason} onChange={handleChange} required rows={3} style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 6, border: '1px solid #c7d2fe', background: '#f1f5ff', resize: 'vertical' }} />
					   </div>
					   <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, letterSpacing: 1, boxShadow: '0 2px 8px rgba(60,72,100,0.10)', transition: 'background 0.2s' }}>
						   {loading ? 'Applying...' : 'Apply Leave'}
					   </button>
					   {message && <div style={{ marginTop: 18, color: message.includes('success') ? '#22c55e' : '#ef4444', fontWeight: 500, textAlign: 'center' }}>{message}</div>}
				   </form>

				   <h3 style={{ marginTop: 0, marginBottom: 18, color: '#3b3b5c', fontWeight: 700, letterSpacing: 1 }}>My Leave Applications</h3>
				   <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(60,72,100,0.07)', padding: 20 }}>
					   {fetching ? (
						   <div style={{ textAlign: 'center', color: '#6366f1', fontWeight: 500 }}>Loading leave applications...</div>
					   ) : leaves.length === 0 ? (
						   <div style={{ textAlign: 'center', color: '#64748b', fontWeight: 500 }}>No leave applications found.</div>
					   ) : (
						   <div style={{ overflowX: 'auto' }}>
							   <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: 0, fontSize: 15 }}>
								   <thead>
									   <tr style={{ background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', color: '#fff' }}>
										   <th style={{ padding: 12, borderTopLeftRadius: 8 }}>Type</th>
										   <th style={{ padding: 12 }}>Start</th>
										   <th style={{ padding: 12 }}>End</th>
										   <th style={{ padding: 12 }}>Reason</th>
										   <th style={{ padding: 12 }}>Status</th>
										   <th style={{ padding: 12, borderTopRightRadius: 8 }}>Applied At</th>
									   </tr>
								   </thead>
								   <tbody>
									   {leaves.map((leave, idx) => (
										   <tr key={leave._id} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#e0e7ff', transition: 'background 0.2s' }}>
											   <td style={{ padding: 10, textAlign: 'center', fontWeight: 500 }}>{leave.leaveType}</td>
											   <td style={{ padding: 10, textAlign: 'center' }}>{leave.startDate ? new Date(leave.startDate).toLocaleDateString() : ''}</td>
											   <td style={{ padding: 10, textAlign: 'center' }}>{leave.endDate ? new Date(leave.endDate).toLocaleDateString() : ''}</td>
											   <td style={{ padding: 10 }}>{leave.reason}</td>
											   <td style={{ padding: 10, textAlign: 'center' }}>
												   <span style={{
													   display: 'inline-block',
													   padding: '4px 12px',
													   borderRadius: 12,
													   background: leave.status === 'Approved' ? '#bbf7d0' : leave.status === 'Rejected' ? '#fee2e2' : '#fef9c3',
													   color: leave.status === 'Approved' ? '#15803d' : leave.status === 'Rejected' ? '#b91c1c' : '#b45309',
													   fontWeight: 600,
													   fontSize: 14
												   }}>{leave.status}</span>
											   </td>
											   <td style={{ padding: 10, textAlign: 'center' }}>{leave.appliedAt ? new Date(leave.appliedAt).toLocaleString() : ''}</td>
										   </tr>
									   ))}
								   </tbody>
							   </table>
						   </div>
					   )}
				   </div>
			   </div>
		   );
};

export default Leave;
