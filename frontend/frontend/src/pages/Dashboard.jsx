import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { FiHome, FiPieChart, FiShoppingCart, FiBook, FiTruck, FiLayers } from 'react-icons/fi';
import { FiMail, FiMessageSquare, FiCalendar, FiGrid, FiFileText, FiUsers, FiLock, FiFile, FiZap } from 'react-icons/fi';
import { FiType, FiFeather, FiCreditCard } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });
  const [uniqueValues, setUniqueValues] = useState({
    endYears: [],
    topic: [],
    sectors: [],
    regions: [],
    pestle: [],
    sources: [],
    swot: [],
    countries: [],
    city: []
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboards');

  // Fetch data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/insights/');
        setData(response.data);
        setFilteredData(response.data);
        
        // Extract unique values for filters
        setUniqueValues({
          endYears: [...new Set(response.data.map(item => item.end_year))].filter(Boolean),
          topic: [...new Set(response.data.flatMap(item => item.topic || []))].filter(Boolean),
          sectors: [...new Set(response.data.map(item => item.sector))].filter(Boolean),
          regions: [...new Set(response.data.map(item => item.region))].filter(Boolean),
          pestle: [...new Set(response.data.map(item => item.pestle))].filter(Boolean),
          sources: [...new Set(response.data.map(item => item.source))].filter(Boolean),
          swot: [...new Set(response.data.map(item => item.swot))].filter(Boolean),
          countries: [...new Set(response.data.map(item => item.country))].filter(Boolean),
          city: [...new Set(response.data.map(item => item.city))].filter(Boolean)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Apply filters  change
  useEffect(() => {
    let result = [...data];
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'topic') {
          result = result.filter(item => item.topic && item.topic.includes(value));
        } else {
          result = result.filter(item => item[key] === value);
        }
      }
    });

    setFilteredData(result);
  }, [filters, data]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value === 'All' ? '' : value
    }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="menu-icon"></span>
          </button>
          <h1 className="logo">Vuexy</h1>
        </div>
        <div className="navbar-right">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-menu">
            <span className="username">Admin</span>
            <div className="avatar">A</div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-menu">
          <h2 className="sidebar-title">Dashboards</h2>
          <ul>
            <li 
              className={activeMenu === 'Dashboards' ? 'active' : ''}
              onClick={() => setActiveMenu('Dashboards')}
            >
              <FiHome className="icon" />
              <span>Analytics</span>
            </li>
            <li>
              <FiPieChart className="icon" />
              <span>CRM</span>
            </li>
            <li>
              <FiShoppingCart className="icon" />
              <span>Ecommerce</span>
            </li>
            <li>
              <FiBook className="icon" />
              <span>Academy</span>
            </li>
            <li>
              <FiTruck className="icon" />
              <span>Logistics</span>
            </li>
            <li>
              <FiLayers className="icon" />
              <span>Front Pages</span>
            </li>
          </ul>

          <h3 className="sidebar-subtitle">APP'S & PAGES</h3>
          <ul>
            <li>
              <FiShoppingCart className="icon" />
              <span>Ecommerce</span>
            </li>
            <li>
              <FiBook className="icon" />
              <span>Academy</span>
            </li>
            <li>
              <FiTruck className="icon" />
              <span>Logistics</span>
            </li>
            <li>
              <FiMail className="icon" />
              <span>Email</span>
            </li>
            <li>
              <FiMessageSquare className="icon" />
              <span>Chat</span>
            </li>
            <li>
              <FiCalendar className="icon" />
              <span>Calendar</span>
            </li>
            <li>
              <FiGrid className="icon" />
              <span>Kanban</span>
            </li>
            <li>
              <FiFileText className="icon" />
              <span>Invoice</span>
            </li>
            <li>
              <FiUsers className="icon" />
              <span>User</span>
            </li>
            <li>
              <FiLock className="icon" />
              <span>Roles & Permissions</span>
            </li>
            <li>
              <FiFile className="icon" />
              <span>Pages</span>
            </li>
            <li>
              <FiZap className="icon" />
              <span>Authentication</span>
            </li>
            <li>
              <FiZap className="icon" />
              <span>Wizard Examples</span>
            </li>
            <li>
              <FiZap className="icon" />
              <span>Dialog Examples</span>
            </li>
          </ul>

          <h3 className="sidebar-subtitle">UI ELEMENTS</h3>
          <ul>
            <li>
              <FiType className="icon" />
              <span>Typography</span>
            </li>
            <li>
              <FiFeather className="icon" />
              <span>Icons</span>
            </li>
            <li>
              <FiCreditCard className="icon" />
              <span>Cards</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Analytics Dashboard</h1>
        </div>

        <div className="dashboard-container">
          {/* Filters Sidebar - Moved to main content area */}
          <div className="filters-sidebar">
            <h2>Filters</h2>
            
            <FilterDropdown 
              label="End Year"
              options={['All', ...uniqueValues.endYears]}
              onChange={(value) => handleFilterChange('endYear', value)}
            />
            
            <FilterDropdown 
              label="Topics"
              options={['All', ...uniqueValues.topic]}
              onChange={(value) => handleFilterChange('topic', value)}
            />
            
            <FilterDropdown 
              label="Sector"
              options={['All', ...uniqueValues.sectors]}
              onChange={(value) => handleFilterChange('sector', value)}
            />
            
            <FilterDropdown 
              label="Region"
              options={['All', ...uniqueValues.regions]}
              onChange={(value) => handleFilterChange('region', value)}
            />
            
            <FilterDropdown 
              label="PEST"
              options={['All', ...uniqueValues.pestle]}
              onChange={(value) => handleFilterChange('pestle', value)}
            />
            
            <FilterDropdown 
              label="Source"
              options={['All', ...uniqueValues.sources]}
              onChange={(value) => handleFilterChange('source', value)}
            />
            
            <FilterDropdown 
              label="SWOT"
              options={['All', ...uniqueValues.swot]}
              onChange={(value) => handleFilterChange('swot', value)}
            />
            
            <FilterDropdown 
              label="Country"
              options={['All', ...uniqueValues.countries]}
              onChange={(value) => handleFilterChange('country', value)}
            />
            
            <FilterDropdown 
              label="City"
              options={['All', ...uniqueValues.city]}
              onChange={(value) => handleFilterChange('city', value)}
            />
          </div>

          {/* Visualizations */}
          <div className="visualizations">
             <div className="stats-summary">
              <StatCard title="Total Records" value={filteredData.length} color="#7367F0" />
              <StatCard title="Avg Intensity" value={d3.mean(filteredData, d => d.intensity) || 0} color="#28C76F" />
              <StatCard title="Avg Likelihood" value={d3.mean(filteredData, d => d.likelihood) || 0} color="#EA5455" />
              <StatCard title="Avg Relevance" value={d3.mean(filteredData, d => d.relevance) || 0} color="#FF9F43" />
            </div>

           <div className="chart-row">
              <div className="chart-card">
                <h3>Intensity Distribution</h3>
                <BarChart 
                  data={filteredData} 
                  xAccessor={d => d.intensity} 
                  yAccessor={d => d}
                  width={400}
                  height={300}
                  color="#7367F0"
                />
              </div>

              <div className="chart-card">
                <h3>Likelihood vs Relevance</h3>
                <ScatterPlot 
                  data={filteredData}
                  xAccessor={d => d.likelihood}
                  yAccessor={d => d.relevance}
                  width={400}
                  height={300}
                  color="#EA5455"
                />
              </div>
              <div className="chart-card">
                <h3>Relevance by Year</h3>
                <LineChart 
                  data={filteredData}
                  xAccessor={d => d.start_year}
                  yAccessor={d => d.relevance}
                  width={400}
                  height={300}
                  color="#FF9F43"
                />
              </div>
            </div>

            <div className="chart-row">
              <div className="chart-card">
                <h3>Data by Country</h3>
                <CountryHeatmap 
                  data={filteredData}
                  width={600}
                  height={400}
                  colors={['#e0e0e0', '#7367F0']}
                />
              </div>

              <div className="chart-card">
                <h3>Topics Distribution</h3>
                <PieChart 
                  data={filteredData}
                  width={400}
                  height={300}
                  colors={['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8']}
                />
              </div>
            </div>

            <div className="chart-row">
              <div className="chart-card">
                <h3>Region Distribution</h3>
                <HorizontalBarChart 
                  data={filteredData}
                  xAccessor={d => d.region}
                  yAccessor={d => d}
                  width={600}
                  height={300}
                  color="#28C76F"
                />
              </div>
              
              <div className="chart-card">
                <h3>City Distribution</h3>
                <DonutChart 
                  data={filteredData}
                  categoryAccessor={d => d.city}
                  valueAccessor={d => 1}
                  width={400}
                  height={300}
                  colors={['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#00CFE8']}
                />
              </div>
            </div>
             <div className="chart-row">
              <div className="chart-card">
                <h3>Intensity Trend</h3>
                <AreaChart 
                  data={filteredData}
                  xAccessor={d => d.start_year}
                  yAccessor={d => d.intensity}
                  width={800}
                  height={400}
                  color="#7367F0"
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="dashboard-footer">
          <div className="footer-content">
            <button className="footer-button">Buy Now</button>
            <button className="footer-button">License More Themes</button>
            <button className="footer-button">Documentation</button>
            <button className="footer-button">Support</button>
          </div>
          <p className="copyright">© 2025 Made With By Pixinvent</p>
        </footer>
      </div>
    </div>
  );
};


// Component for filter dropdowns
const FilterDropdown = ({ label, options, onChange }) => (
  <div className="filter-group">
    <label>{label}</label>
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Component for stat cards
const StatCard = ({ title, value, color }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <h4>{title}</h4>
    <p>{typeof value === 'number' ? value.toFixed(2) : value}</p>
  </div>
);

// D3.js Bar Chart Component
const BarChart = ({ data, xAccessor, yAccessor, width, height,color }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous chart
    svg.selectAll('*').remove();

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, xAccessor)])
      .range([height, 0]);

    // Create bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(xAccessor(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(xAccessor(d)))
      .attr('fill', color || 'steelblue');

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat(i => i);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

  }, [data, xAccessor, width, height]);

  return <svg ref={ref} />;
};

// D3.js Scatter Plot Component
const ScatterPlot = ({ data, xAccessor, yAccessor, width, height,color }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous chart
    svg.selectAll('*').remove();

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xAccessor)])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, yAccessor)])
      .range([height, 0]);

    // Create circles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(xAccessor(d)))
      .attr('cy', d => yScale(yAccessor(d)))
      .attr('r', 5)
      .attr('fill', color || 'steelblue');

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);

  }, [data, xAccessor, yAccessor, width, height]);

  return <svg ref={ref} />;
};

// D3.js Line Chart Component
const LineChart = ({ data, xAccessor, yAccessor, width, height, color }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible');

    // Clear previous chart
    svg.selectAll('*').remove();

    // Filter out null/undefined years and group by year
    const validData = data.filter(d => xAccessor(d) !== null && xAccessor(d) !== undefined);
    
    const groupedData = d3.rollup(
      validData,
      v => d3.mean(v, yAccessor),
      d => xAccessor(d)
    );

    const sortedData = Array.from(groupedData, ([year, value]) => ({
      year: +year,
      value: +value
    })).sort((a, b) => a.year - b.year);

    // Create scales with padding
    const xScale = d3.scaleLinear()
      .domain(d3.extent(sortedData, d => d.year))
      .range([50, width - 30]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.value) * 1.1])
      .range([height - 50, 30]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw line
    svg.append('path')
      .datum(sortedData)
      .attr('fill', 'none')
      .attr('stroke', color || 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add circles for data points
    svg.selectAll('.data-point')
      .data(sortedData)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.value))
      .attr('r', 4)
      .attr('fill', color || 'steelblue');

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis);

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#333')
      .text('Relevance by Year');

  }, [data, xAccessor, yAccessor, width, height, color]);

  return <svg ref={ref} />;
};

// D3.js Word Cloud Component (simplified)
const WordCloud = ({ data, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous chart
    svg.selectAll('*').remove();

    // Count word frequencies
    const wordCounts = d3.rollup(
      data,
      v => v.length,
      d => d
    );

    const words = Array.from(wordCounts, ([text, count]) => ({ text, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);

    // Create scales
    const sizeScale = d3.scaleLinear()
      .domain([0, d3.max(words, d => d.count)])
      .range([10, 50]);

    // Position words randomly
    words.forEach(word => {
      word.x = Math.random() * (width - 100) + 50;
      word.y = Math.random() * (height - 50) + 25;
    });

    // Draw words
    svg.selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('font-size', d => `${sizeScale(d.count)}px`)
      .attr('fill', 'steelblue')
      .text(d => d.text);

  }, [data, width, height]);

  return <svg ref={ref} />;
};

// New CountryHeatmap component
const CountryHeatmap = ({ data, width, height, colors }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Count data by country
    const countryCounts = d3.rollup(
      data,
      v => v.length,
      d => d.country
    );

    const countries = Array.from(countryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(countries, d => d[1])])
      .range(colors || ['#e0e0e0', '#7367F0']);

    // Create a grid layout
    const gridSize = Math.min(width / 5, height / 2);
    const gridPadding = 10;

    svg.selectAll('rect')
      .data(countries)
      .enter()
      .append('rect')
      .attr('x', (d, i) => (i % 5) * (gridSize + gridPadding))
      .attr('y', (d, i) => Math.floor(i / 5) * (gridSize + gridPadding))
      .attr('width', gridSize)
      .attr('height', gridSize)
      .attr('fill', d => colorScale(d[1]))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    svg.selectAll('text')
      .data(countries)
      .enter()
      .append('text')
      .attr('x', (d, i) => (i % 5) * (gridSize + gridPadding) + gridSize / 2)
      .attr('y', (d, i) => Math.floor(i / 5) * (gridSize + gridPadding) + gridSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .text(d => d[0])
      .style('font-size', '10px')
      .style('fill', '#333');

  }, [data, width, height, colors]);

  return <svg ref={ref} />;
};

// New PieChart component
const PieChart = ({ data, width, height, colors }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Flatten and count topics - ensure we handle cases where topic might be null/undefined
    const allTopics = data.flatMap(d => {
      if (!d.topic) return [];
      if (Array.isArray(d.topic)) return d.topic;
      return [d.topic]; 
    }).filter(Boolean); 

    if (allTopics.length === 0) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .text('No topic data available');
      return;
    }

    const topicCounts = d3.rollup(
      allTopics,
      v => v.length,
      d => d
    );

    const topics = Array.from(topicCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const radius = Math.min(width, height) / 2 - 10;
    const color = d3.scaleOrdinal()
      .domain(topics.map(d => d[0]))
      .range(colors || d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d[1])
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = pie(topics);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    // Add labels with lines
    const labelArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    g.selectAll('.topic-label')
      .data(arcs)
      .enter()
      .append('text')
      .attr('class', 'topic-label')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => d.data[0])
      .style('font-size', '10px')
      .style('text-anchor', 'middle')
      .style('fill', '#333');

  }, [data, width, height, colors]);

  return <svg ref={ref} />;
};
// New HorizontalBarChart component
const HorizontalBarChart = ({ data, xAccessor, yAccessor, width, height, color }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Group data by region
    const regionData = d3.rollup(
      data,
      v => v.length,
      d => xAccessor(d)
    );

    const regions = Array.from(regionData.entries())
      .sort((a, b) => b[1] - a[1]);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(regions, d => d[1])])
      .range([0, width - 100]);

    const yScale = d3.scaleBand()
      .domain(regions.map(d => d[0]))
      .range([0, height - 40])
      .padding(0.1);

    // Add bars
    svg.selectAll('rect')
      .data(regions)
      .enter()
      .append('rect')
      .attr('x', 100)
      .attr('y', d => yScale(d[0]))
      .attr('width', d => xScale(d[1]))
      .attr('height', yScale.bandwidth())
      .attr('fill', color || 'steelblue');

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(100, 0)`)
      .call(d3.axisLeft(yScale));

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(100, ${height - 40})`)
      .call(d3.axisBottom(xScale));

  }, [data, xAccessor, width, height, color]);

  return <svg ref={ref} />;
};

// New DonutChart component
const DonutChart = ({ data, categoryAccessor, valueAccessor, width, height, colors }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Group data by category
    const groupedData = d3.rollup(
      data,
      v => v.length,
      d => categoryAccessor(d)
    );

    const categories = Array.from(groupedData.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const radius = Math.min(width, height) / 2 - 10;
    const color = d3.scaleOrdinal()
      .domain(categories.map(d => d[0]))
      .range(colors || d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d[1]);

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = pie(categories);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    // Add center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text(`${categories.length} Cities`)
      .style('font-size', '14px')
      .style('fill', '#333');

  }, [data, categoryAccessor, width, height, colors]);

  return <svg ref={ref} />;
};

// New AreaChart component
const AreaChart = ({ data, xAccessor, yAccessor, width, height, color }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible');

    svg.selectAll('*').remove();

    // Filter out null/undefined years and group by year
    const validData = data.filter(d => xAccessor(d) !== null && xAccessor(d) !== undefined);
    
    const groupedData = d3.rollup(
      validData,
      v => d3.mean(v, yAccessor),
      d => xAccessor(d)
    );

    const sortedData = Array.from(groupedData, ([year, value]) => ({
      year: +year,
      value: +value
    })).sort((a, b) => a.year - b.year);

    // Create scales with padding
    const xScale = d3.scaleLinear()
      .domain(d3.extent(sortedData, d => d.year))
      .range([50, width - 30]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.value) * 1.1])
      .range([height - 50, 30]);

    // Create area generator
    const area = d3.area()
      .x(d => xScale(d.year))
      .y0(yScale(0))
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw area
    svg.append('path')
      .datum(sortedData)
      .attr('d', area)
      .attr('fill', color || 'steelblue')
      .attr('fill-opacity', 0.3)
      .attr('stroke', color || 'steelblue')
      .attr('stroke-width', 2);

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis);

    // Add chart title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#333')
      .text('Intensity Trend Over Years');

  }, [data, xAccessor, yAccessor, width, height, color]);

  return <svg ref={ref} />;
};



export default Dashboard;