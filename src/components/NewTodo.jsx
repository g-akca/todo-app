function NewTodo() {
  return (
    <div className="bg-navy-900 h-12 px-6 rounded-[5px] shadow-[0_35px_50px_rgba(0,0,0,0.5)] flex items-center gap-4">
      <div className="w-5 aspect-square rounded-full border border-purple-800" />

      <p className="text-gray-600">Create a new todo…</p>
    </div>
  )
}

export default NewTodo;