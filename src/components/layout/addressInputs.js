export default function AddressInputs({ addressProps, setAddressProps, disabled = false }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <div>
        <label>Phone</label>
        <input
          disabled={disabled}
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={ev => !disabled && setAddressProps('phone', ev.target.value)}
          className="block w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label>Street Address</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={ev => !disabled && setAddressProps('streetAddress', ev.target.value)}
          className="block w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div className="flex gap-2">
        <div>
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={ev => !disabled && setAddressProps('postalCode', ev.target.value)}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city}
            onChange={ev => !disabled && setAddressProps('city', ev.target.value)}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div>
        <label>Country</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Country"
          value={country}
          onChange={ev => !disabled && setAddressProps('country', ev.target.value)}
          className="block w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
    </>
  );
}
