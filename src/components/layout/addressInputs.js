export default function AddressInputs({ addressProps, setAddressProps }) {
    const { phone, streetAddress, postalCode, city, country } = addressProps;
  
    return (
      <>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={ev => setAddressProps('phone', ev.target.value)} // Correctly sets phone
            className="block w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
  
        <div>
          <label>Street Address</label>
          <input
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            onChange={ev => setAddressProps('streetAddress', ev.target.value)} // Now sets streetAddress
            className="block w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
  
        <div className="flex gap-2">
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={ev => setAddressProps('postalCode', ev.target.value)} // Now sets postalCode
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={ev => setAddressProps('city', ev.target.value)} // Now sets city
              className="block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
  
        <div>
          <label>Country</label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={ev => setAddressProps('country', ev.target.value)} // Now sets country
            className="block w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      </>
    );
  }
  