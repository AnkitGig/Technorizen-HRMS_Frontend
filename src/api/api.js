// Apply for leave for the logged-in user
export async function applyLeave(leaveData, token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/leave/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(leaveData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to apply leave');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
// Mark attendance (Check Out) for the logged-in user
export async function checkOut(token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/attendance/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ type: 'checkout' }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Check-out failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
// Mark attendance (Check In) for the logged-in user
export async function checkIn(token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/attendance/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ type: 'checkin' }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Check-in failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
// Fetch salary data for the logged-in user
export async function getSalary(token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/salary/my', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch salary');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
// Fetch attendance data for the logged-in user
export async function getAttendance(token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/attendance/me', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch attendance');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

// Fetch leave data for the logged-in user
export async function getLeave(token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/leave/me', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch leave');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

// ...existing code...
// src/api/auth.js
// Handles authentication API calls

export async function login({ username, password }) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}


// src/api/profile.js
// Handles profile API calls

export async function getProfile(token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/employee/me', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(profile, token) {
  try {
    const response = await fetch('https://technorizen-hrms-backend.onrender.com/api/employee/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(profile),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
