
export function formatDateTime(isoString) {
    const date = new Date(isoString);
  
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
  
    // Format the date using toLocaleString
    const formatted = date.toLocaleString('en-GB', options);
  
    // Replace comma if present (depends on locale)
    return formatted.replace(',', ' -');
  }
  