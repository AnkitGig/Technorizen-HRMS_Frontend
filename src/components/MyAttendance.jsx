
import React from "react";

const MyAttendance = () => {
	return (
		<div style={{ background: '#f8fafc', minHeight: '100vh', padding: '24px' }}>
			{/* Header */}
			<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div style={{
						border: '1.5px solid #e5e7eb',
						borderRadius: 12,
						width: 40,
						height: 40,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#fff',
					}}>
						<svg width="24" height="24" fill="none" stroke="#0e1726" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
					</div>
					<div>
						<h1 style={{ fontWeight: 700, fontSize: 32, margin: 0 }}>My Attendance</h1>
						<div style={{ color: '#64748b', fontSize: 15, marginTop: 2 }}>
							Obsessed with ideas, driven by growth, and always trying to leave things better than I found them.
						</div>
					</div>
				</div>
				<div style={{ marginLeft: 'auto' }}>
					<div style={{
						background: '#fff',
						border: '1.5px solid #e5e7eb',
						borderRadius: 8,
						padding: '6px 18px',
						fontSize: 15,
						color: '#334155',
					}}>
						1 Jan, 2025 - 31 Jan, 2025
					</div>
				</div>
			</div>

			{/* Card */}
			<div style={{ background: '#fff', borderRadius: 16, marginTop: 32, padding: 32, boxShadow: '0 2px 8px #0001', border: '1.5px solid #e5e7eb' }}>
				<div style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>My Attendance</div>
				<div style={{ position: 'relative' }}>
					{/* Table */}
					<table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#f8fafc', borderRadius: 12, overflow: 'hidden' }}>
						<thead style={{ background: '#f1f5f9' }}>
							<tr style={{ textAlign: 'left', color: '#0e1726', fontWeight: 600, fontSize: 16 }}>
								<th style={{ padding: '16px 20px' }}>Month <span style={{ fontSize: 14 }}>▼</span></th>
								<th style={{ padding: '16px 20px' }}>Total days <span style={{ fontSize: 14 }}>▼</span></th>
								<th style={{ padding: '16px 20px' }}>Leaves <span style={{ fontSize: 14 }}>▼</span></th>
								<th style={{ padding: '16px 20px' }}>Status <span style={{ fontSize: 14 }}>▼</span></th>
							</tr>
						</thead>
						<tbody>
							<tr style={{ background: '#fff', fontSize: 16, color: '#0e1726' }}>
								<td style={{ padding: '16px 20px' }}>Jan</td>
								<td style={{ padding: '16px 20px' }}>31</td>
								<td style={{ padding: '16px 20px' }}>0</td>
								<td style={{ padding: '16px 20px' }}>
									<span style={{ background: '#d1fae5', color: '#059669', borderRadius: 16, padding: '4px 18px', fontWeight: 600, fontSize: 15 }}>Active</span>
								</td>
							</tr>
						</tbody>
					</table>
					{/* Search icon */}
					<div style={{ position: 'absolute', top: 12, right: 16 }}>
						<svg width="22" height="22" fill="none" stroke="#0e1726" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
					</div>
				</div>
				{/* Pagination */}
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, color: '#64748b', fontSize: 15 }}>
					<div>1-10 of 200 items per page</div>
					<div style={{ display: 'flex', gap: 8 }}>
						<button style={{ border: '1.5px solid #e5e7eb', background: '#fff', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
							<span style={{ fontSize: 22, color: '#64748b' }}>‹</span>
						</button>
						<button style={{ border: '1.5px solid #e5e7eb', background: '#fff', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
							<span style={{ fontSize: 22, color: '#64748b' }}>›</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyAttendance;
