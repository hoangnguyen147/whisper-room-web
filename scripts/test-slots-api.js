// Script để test slots API mới
// Chạy với: node scripts/test-slots-api.js

const API_BASE_URL = 'http://localhost:1337';

// Helper function để format date
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Helper function để tạo date range
const getDateRange = (startDate, days) => {
  const start = formatDate(startDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + days - 1);
  const end = formatDate(endDate);
  return { start, end };
};

// Test function
const testSlotsApi = async () => {
  console.log('🧪 Testing Slots API with new parameters...\n');

  const today = new Date();
  const { start: weekStart, end: weekEnd } = getDateRange(today, 7);

  const testCases = [
    {
      name: 'Get slots for today only',
      url: `${API_BASE_URL}/api/get-available-slots?date=${formatDate(today)}`,
      description: 'Single date query'
    },
    {
      name: 'Get slots for next 7 days',
      url: `${API_BASE_URL}/api/get-available-slots?start_date=${weekStart}&end_date=${weekEnd}`,
      description: 'Week range query'
    },
    {
      name: 'Get slots from today onwards',
      url: `${API_BASE_URL}/api/get-available-slots?start_date=${formatDate(today)}`,
      description: 'Open-ended start date'
    },
    {
      name: 'Get all available slots',
      url: `${API_BASE_URL}/api/get-available-slots`,
      description: 'No parameters - all slots'
    }
  ];

  const results = [];

  for (const testCase of testCases) {
    console.log(`🔍 ${testCase.name}`);
    console.log(`📝 ${testCase.description}`);
    console.log(`🌐 URL: ${testCase.url}`);
    
    try {
      const startTime = Date.now();
      const response = await fetch(testCase.url);
      const duration = Date.now() - startTime;
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ Success! Found ${result.data?.length || 0} slots (${duration}ms)`);
        console.log(`📊 Filter info:`, result.filter);
        
        // Log first few slots for verification
        if (result.data && result.data.length > 0) {
          console.log(`📅 Sample slots:`);
          result.data.slice(0, 3).forEach((slot, index) => {
            const startTime = new Date(slot.start_time).toLocaleString('vi-VN');
            const endTime = new Date(slot.end_time).toLocaleString('vi-VN');
            console.log(`   ${index + 1}. ${startTime} - ${endTime} (ID: ${slot.id})`);
          });
          if (result.data.length > 3) {
            console.log(`   ... and ${result.data.length - 3} more slots`);
          }
        }
        
        results.push({
          testCase: testCase.name,
          success: true,
          count: result.data?.length || 0,
          duration,
          filter: result.filter
        });
      } else {
        console.log(`❌ Failed: ${result.error}`);
        results.push({
          testCase: testCase.name,
          success: false,
          error: result.error,
          duration
        });
      }
    } catch (error) {
      console.log(`💥 Error: ${error.message}`);
      results.push({
        testCase: testCase.name,
        success: false,
        error: error.message
      });
    }
    
    console.log(''); // Empty line for readability
  }

  // Summary
  console.log('📋 Test Summary:');
  console.log('================');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    const info = result.success 
      ? `${result.count} slots (${result.duration}ms)`
      : `Error: ${result.error}`;
    console.log(`${status} ${index + 1}. ${result.testCase}: ${info}`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Overall: ${successCount}/${results.length} tests passed`);

  return results;
};

// Test specific week range
const testWeekRange = async () => {
  const today = new Date();
  const { start, end } = getDateRange(today, 7);
  
  console.log(`\n🗓️ Testing week range: ${start} to ${end}`);
  
  const url = `${API_BASE_URL}/api/get-available-slots?start_date=${start}&end_date=${end}`;
  console.log(`🌐 URL: ${url}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ Found ${result.data?.length || 0} slots for the week`);
      
      // Group by date
      const slotsByDate = {};
      result.data?.forEach(slot => {
        const date = slot.start_time.split('T')[0];
        if (!slotsByDate[date]) {
          slotsByDate[date] = [];
        }
        slotsByDate[date].push(slot);
      });
      
      console.log('📅 Slots by date:');
      Object.entries(slotsByDate).forEach(([date, slots]) => {
        console.log(`   ${date}: ${slots.length} slots`);
      });
      
      return { success: true, slotsByDate, total: result.data?.length || 0 };
    } else {
      console.log(`❌ Failed: ${result.error}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// Run tests
const runTests = async () => {
  console.log('🚀 Starting Slots API Tests...\n');
  
  try {
    await testSlotsApi();
    await testWeekRange();
  } catch (error) {
    console.error('💥 Test runner error:', error);
  }
  
  console.log('\n🏁 Tests completed!');
};

// Check if running directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testSlotsApi,
  testWeekRange,
  formatDate,
  getDateRange
};
