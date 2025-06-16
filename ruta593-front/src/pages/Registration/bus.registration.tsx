import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaBus } from 'react-icons/fa';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { MdOutlineReduceCapacity } from 'react-icons/md';
import { CreateBusT } from '../../types';
import createBus from '../../hooks/useBusCreation';
import { useBusStructure } from '../../hooks/useBusStructure';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DataList from '../../components/DataList/datalist.components';

const initialStateBus: CreateBusT = {
  bus_number: '',
  license_plate: '',
  chassis_vin: '',
  bus_manufacturer: '',
  model: '',
  year: 0,
  capacity: 0,
  bus_structure_id: 0,
};

const BusRegistration: React.FC = () => {
  const { loading: loadingStructures, selectBusStructures } = useBusStructure();
  const [selectedBusStructure, setSelectedBusStructure] = useState<string>('');
  const { loading: loadingBus, bus } = createBus();
  const [inputBus, setInputBus] = useState<CreateBusT>(initialStateBus);
  const [selectedBusImg, setSelectedBusImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'bus_structure_id') {
      setSelectedBusStructure(value);
    }

    setInputBus({
      ...inputBus,
      [name]: name === 'year' || name === 'capacity' || name === 'bus_structure_id'
        ? Number(value)
        : value,
    });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedBusImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedBusImg) {
    toast.error('Por favor, selecciona una imagen');
    return;
  }



  await bus(inputBus, selectedBusImg!); // aquí asegúrate de que `bus()` acepte FormData correctamente
};

  const handleCancel = () => {
    setInputBus(initialStateBus);
    setSelectedBusStructure('');
    setSelectedBusImg(null);
    setPreviewImg(null);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <Breadcrumb pageName="Registro de buses" />

      <div className="bg-[#FEDD00] rounded-xl shadow-xl p-6 mt-6">
        <div className="bg-[#0F1A2F] rounded-xl p-10">
          <h3 className="bg-[#FEDD00] text-[#0F1A2F] font-bold text-lg rounded-md inline-block px-4 py-2 mb-6">
            Información del Bus
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="bus_number" placeholder="Número de unidad" value={inputBus.bus_number} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white" />
            <input type="text" name="license_plate" placeholder="Número de placa" value={inputBus.license_plate} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white" />
            <input type="text" name="chassis_vin" placeholder="Número de chasis" value={inputBus.chassis_vin} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white" />
            <input type="text" name="bus_manufacturer" placeholder="Marca" value={inputBus.bus_manufacturer} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white" />
            <input type="text" name="model" placeholder="Modelo" value={inputBus.model} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white" />

            <select name="year" value={inputBus.year || ''} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white">
              <option value="">Seleccione un año</option>
              {Array.from({ length: 50 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>

            <input type="number" name="capacity" placeholder="Capacidad" value={inputBus.capacity || ''} onChange={handleChange} className="p-3 rounded-md bg-[#172B4D] text-white" />

            {/* DataList funcional */}
            <DataList
              id="bus_structure_id"
              label="Estructura del Bus"
              placeholder="Seleccione o busque una estructura"
              options={selectBusStructures || []}
              value={selectedBusStructure}
              onSelect={(value) => {
                setSelectedBusStructure(value);
                setInputBus({ ...inputBus, bus_structure_id: Number(value) });
              }}
              iconP={FaBus}
              opKey="id"
              opValue="id"
              optionP="name"
            />

            <div className="col-span-2">
              <label className="text-white font-medium mb-2 block">Subir imagen</label>
              <input type="file" accept="image/*" onChange={handleFiles} className="text-white" />
              {previewImg && <img src={previewImg} alt="Preview" className="mt-4 w-40 rounded-md" />}
            </div>

            <div className="col-span-2 flex justify-end gap-4">
              <button type="button" onClick={handleCancel} className="bg-white text-[#0F1A2F] py-2 px-6 rounded-md font-medium hover:bg-gray-200 transition">Cancelar</button>
              <button type="submit" disabled={loadingBus} className="bg-[#FEDD00] text-[#0F1A2F] py-2 px-6 rounded-md font-medium hover:brightness-110 transition">
                {loadingBus ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusRegistration;
