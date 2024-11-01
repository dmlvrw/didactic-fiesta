'use client';

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', date: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('预订成功！');
  };

  return (
    <div>
      <h1>高尔夫场地预订</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>姓名：</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>邮箱：</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>日期：</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <button type="submit">提交预订</button>
      </form>
    </div>
  );
}
