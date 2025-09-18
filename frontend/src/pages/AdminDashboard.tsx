import React from 'react'
import AdminSidebar from '../components/ui/AdminSidebar'


export default function AdminDashboard(){
return (
<div style={{ display:'flex', gap:16 }}>
<AdminSidebar />
<div style={{ flex:1, background:'#fff', padding:24 }}>
<h2>Admin Dashboard</h2>
<p>Orders, products management, stats...</p>
</div>
</div>
)
}