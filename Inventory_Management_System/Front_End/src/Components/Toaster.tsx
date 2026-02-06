function Toast(message: String, show : boolean) 
{
  if (!show) 
    return null;

  return (
    <div className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
      {message}
    </div>
  );
}

export default Toast;