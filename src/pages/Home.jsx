// src/pages/Home.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import PromoPanel from '../components/PromoPanel';
import SuccessModal from '../components/SuccessModal';
import Toast from '../components/Toast';
import LineSelection from './LineSelection';
import ConfigurePromo from './ConfigurePromo';
import '../styles/Home.css';

// Define jifLines directly in the Home component
const jifLines = [
  {
    id: 'line-16oz',
    name: 'JIF-Core Stabilized Peanut Butter 16 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448120',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/16oz.png',
  },
  {
    id: 'line-28oz',
    name: 'JIF-Core Stabilized Peanut Butter 28 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448121',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/28oz.png',
  },
  {
    id: 'line-40oz',
    name: 'JIF-Core Stabilized Peanut Butter 40 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448122',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/40oz.png',
  },
  {
    id: 'line-64oz',
    name: 'JIF-Core Stabilized Peanut Butter 64 oz',
    itemCount: 5,
    promoApplied: true,
    lineId: '551448123',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/64oz.png',
  },
  {
    id: 'line-80oz',
    name: 'JIF-Core Stabilized Peanut Butter 80 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448124',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/80oz.png',
  },
];

const Home = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedLines, setSelectedLines] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [formState, setFormState] = useState({
    promoType: '',
    badgeType: '',
    discount: '',
    event: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    holdPeriod: '',
    forceSitePrice: false,
    hasConflict: false,
  });

  // Accordion states
  const [selectLinesCollapsed, setSelectLinesCollapsed] = useState(false);
  const [configPromoCollapsed, setConfigPromoCollapsed] = useState(true);

  const defaultForm = {
    promoType: '',
    badgeType: '',
    discount: '',
    event: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    holdPeriod: '',
    forceSitePrice: false,
    hasConflict: false,
  };

  const handleTriggerClick = () => {
    setIsPanelOpen(true);
    setSelectedLines([]);
    setFormState(defaultForm);
    setHasFormChanged(false);
    setSelectLinesCollapsed(false);
    setConfigPromoCollapsed(true);
  };

  const toggleLine = (id) => {
    setSelectedLines((prev) =>
      prev.includes(id) ? prev.filter((line) => line !== id) : [...prev, id]
    );
  };

  const handleFormChange = (field, value) => {
    // Set the hasFormChanged flag to true when any field changes
    if (!hasFormChanged) {
      setHasFormChanged(true);
    }
    
    const newForm = {
      ...formState,
      [field]: value,
      hasConflict:
        // Only show conflict if the 64oz line is selected and start date is 2024-01-01
        (field === 'startDate' && value === '2024-01-01' && selectedLines.includes('line-64oz')) ||
        (formState.hasConflict && field !== 'startDate' && field !== 'hasConflict' && selectedLines.includes('line-64oz')),
    };

    setFormState(newForm);
  };

  const isFormComplete = () => {
    const {
      promoType,
      badgeType,
      discount,
      event,
      startDate,
      startTime,
      endDate,
      endTime,
      holdPeriod,
      hasConflict,
    } = formState;

    return (
      promoType &&
      badgeType &&
      discount &&
      event &&
      startDate &&
      startTime &&
      endDate &&
      endTime &&
      holdPeriod &&
      !hasConflict
    );
  };

  const handleCancel = () => {
    setIsPanelOpen(false);
    setSelectedLines([]);
    setFormState(defaultForm);
    setHasFormChanged(false);
    setSelectLinesCollapsed(false);
    setConfigPromoCollapsed(true);
  };

  const handleRevert = () => {
    setFormState(defaultForm);
    setHasFormChanged(false);
  };

  const handleApplyPromo = () => {
    if (!isFormComplete()) {
      alert('Please complete all required fields before applying the promotion.');
      return;
    }
    
    // Show success modal
    setShowSuccessModal(true);
    
    // After modal closes, show toast and close panel
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsPanelOpen(false);
      setShowToast(true);
    }, 2200);
  };

  const renderAccordionContent = () => {
    return (
      <div style={{ padding: '24px' }}>
        {/* Select Lines Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px'
        }}>
          {/* Header */}
          <div 
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setSelectLinesCollapsed(!selectLinesCollapsed)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#0071dc',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                1
              </div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Select Lines</h3>
            </div>
            
            {/* Dynamic header content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {selectLinesCollapsed && selectedLines.length > 0 && (
                <>
                  <span>{selectedLines.length} lines selected</span>
                  <div style={{ display: 'flex', marginLeft: '8px' }}>
                    {selectedLines.slice(0, 3).map((lineId, idx) => {
                      const line = jifLines.find(l => l.id === lineId);
                      return (
                        <img
                          key={lineId}
                          src={line?.thumbnail}
                          alt=""
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '4px',
                            marginLeft: idx > 0 ? '-10px' : '0',
                            border: 'none',
                            objectFit: 'contain',
                            zIndex: selectedLines.length - idx
                          }}
                        />
                      );
                    })}
                    {selectedLines.length > 3 && (
                      <span style={{ marginLeft: '8px' }}>+{selectedLines.length - 3}</span>
                    )}
                  </div>
                </>
              )}
              <img 
                src={`https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/${selectLinesCollapsed ? 'down' : 'up'}-caret.svg`}
                alt=""
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          </div>

          {/* Content */}
          {!selectLinesCollapsed && (
            <div style={{ padding: '20px', backgroundColor: 'white' }}>
              {selectedLines.length > 0 && (
                <div style={{
                  backgroundColor: '#f0f7ff',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontWeight: '500' }}>
                    {selectedLines.length} lines selected
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLines([]);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0071dc',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
              
              <LineSelection
                lines={jifLines}
                selectedLines={selectedLines}
                toggleLine={toggleLine}
              />
              
              {selectedLines.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfigPromoCollapsed(false);
                    setTimeout(() => {
                      const configSection = document.querySelector('#config-section');
                      configSection?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  style={{
                    backgroundColor: '#0071dc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    marginTop: '16px',
                    width: '100%'
                  }}
                >
                  Continue to Step 2
                </button>
              )}
            </div>
          )}
        </div>

        {/* Configure Promotion Card */}
        <div 
          id="config-section"
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setConfigPromoCollapsed(!configPromoCollapsed)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#0071dc',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                2
              </div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Configure Promotion</h3>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {configPromoCollapsed && (
                <span style={{ color: selectedLines.length === 0 ? '#666' : '#333' }}>
                  {selectedLines.length === 0 ? 'Please select lines first' : 'Configure promotion details'}
                </span>
              )}
              <img 
                src={`https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/${configPromoCollapsed ? 'down' : 'up'}-caret.svg`}
                alt=""
                style={{ width: '20px', height: '20px' }}
              />
            </div>
          </div>

          {/* Content */}
          {!configPromoCollapsed && (
            <div style={{ padding: '20px', backgroundColor: 'white' }}>
              <ConfigurePromo
                selectedLines={selectedLines}
                formState={formState}
                onFormChange={handleFormChange}
                onBack={() => {
                  setSelectLinesCollapsed(false);
                  setConfigPromoCollapsed(true);
                }}
                onCancel={handleCancel}
                onApplyPromo={handleApplyPromo}
                onRevert={handleRevert}
                jifLines={jifLines}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    const getActiveSection = () => {
      if (!selectLinesCollapsed) return 'lines';
      if (!configPromoCollapsed) return 'config';
      return null;
    };

    const activeSection = getActiveSection();

    if (activeSection === 'lines') {
      return (
        <div className="footer-actions">
          <span>{selectedLines.length} selected</span>
          <div className="right-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (activeSection === 'config') {
      return (
        <div className="footer-actions">
          <button 
            className="revert-btn" 
            onClick={handleRevert}
            disabled={!hasFormChanged}
          >
            Revert
          </button>
          <div className="right-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="apply-btn"
              onClick={handleApplyPromo}
            >
              Apply promo
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="footer-actions">
        <div className="right-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1>eComm Promo Creating/Conflict Management in OPT - v4 Prototype (Accordion)</h1>
        
        <button
          onClick={handleTriggerClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0058AB',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
            marginBottom: '30px'
          }}
        >
          Create eComm Promo
        </button>
        
        <div className="prototype-overview">
          <h2>Welcome! 👋</h2>
          <p>This prototype demonstrates the accordion-style promotion management flow in OPT.</p>
          <p className="creator-info">Created by: <strong>Brandi Kinard</strong> - Senior UX Designer, Pricing Team</p>
          
          <div className="overview-section">
            <h3>What you'll test:</h3>
            <ul>
              <li>Accordion-style UI with collapsible sections</li>
              <li>Progressive disclosure pattern</li>
              <li>Conflict detection and resolution workflow</li>
              <li>Cross-tool experience between OPT and PDP</li>
            </ul>
          </div>
          
          <div className="overview-section">
            <h3>Test scenarios:</h3>
            <ol>
              <li><strong>Simple promo:</strong> Use dates 03/01/2024 - 04/30/2024</li>
              <li><strong>Conflict flow:</strong> Use dates 01/01/2024 - 03/31/2024 (must include 64 oz)</li>
            </ol>
          </div>
          
          <div className="conflict-trigger-note">
            <strong>⚠️ Note:</strong> Select the <strong>64 oz line</strong> (with "Promo applied" chip) to trigger conflicts.
          </div>
          
          <div className="feedback-section">
            <h3>Your feedback needed on:</h3>
            <ul>
              <li>Accordion pattern effectiveness</li>
              <li>Progressive disclosure flow</li>
              <li>Conflict resolution clarity</li>
              <li>Any pain points</li>
            </ul>
          </div>
        </div>
        
        {/* Add space at bottom for scrolling */}
        <div style={{ height: '60px' }}></div>
      </div>

      {isPanelOpen && (
        <PromoPanel
          title="Create eComm Promo"
          onClose={handleCancel}
          footer={renderFooter()}
        >
          {renderAccordionContent()}
        </PromoPanel>
      )}
      
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      
      {showToast && (
        <Toast 
          message="Promotion successfully applied!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </Layout>
  );
};

export default Home;