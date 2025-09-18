import React from "react";

const Footer: React.FC = () => (
    <div style={{ textAlign:'center', padding:20, background:'#fff', borderTop:'1px solid #eee' }}>
      © {new Date().getFullYear()} Fashion Store • All rights reserved
    </div>
)

export default Footer