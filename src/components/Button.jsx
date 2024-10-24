export default function Button({ title, action, style }) {
  return (
    <button
      onClick={action}
      style={{
        borderRadius: '4px',
        fontSize: '10px',
        width: '5rem',
        height: '3rem',
        ...style,
      }}
    >
      {title}
    </button>
  );
}
