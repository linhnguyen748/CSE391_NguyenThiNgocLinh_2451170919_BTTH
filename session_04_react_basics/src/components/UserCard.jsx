// 📄 File: src/components/UserCard.jsx

function UserCard({ name, email, avatar }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "10px", 
            padding: "15px", 
            width: "200px", 
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}>
            <img src={avatar} alt={name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
            <h3 style={{ margin: "10px 0 5px 0" }}>{name}</h3>
            <p style={{ color: "gray", fontSize: "14px", margin: 0 }}>{email}</p>
        </div>
    );
}

export default UserCard;