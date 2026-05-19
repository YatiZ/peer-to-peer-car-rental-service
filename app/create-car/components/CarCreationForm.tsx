'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import getClientUser from '@/config/auth/get-client-user';
import { useCreateCarMutation, useUploadImageMutation } from '@/services/cars-api/mutation';
import { useRouter } from 'next/navigation';



interface CarFormData {
  name: string;
  plate_number: string;
  location: string;
  latitude: number;
  longitude: number;
  price: number;
  seats: number;
  transmission: 'manual' | 'automatic';
  fuel: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  instant_book: boolean;
  features: string[];
  images: string[];
  preview_image: string;
}

const AVAILABLE_FEATURES = [
  'Air Conditioning',
  'Bluetooth',
  'GPS Navigation',
  'Sunroof',
  'Leather Seats',
  'Backup Camera',
  'Apple CarPlay',
  'Android Auto',
  'Heated Seats',
  'Cruise Control',
];

export function CarCreationForm() {
  const router = useRouter();
  const user = getClientUser();
  const uploadImageMutation = useUploadImageMutation();
  const createCarMutation = useCreateCarMutation();
  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    plate_number: '',
    location: '',
    latitude: 0,
    longitude: 0,
    price: 0,
    seats: 4,
    transmission: 'automatic',
    fuel: 'gasoline',
    instant_book: false,
    features: [],
    images: [],
    preview_image: '',
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">You must be logged in as an owner to create a car listing.</p>
        </CardContent>
      </Card>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (['latitude', 'longitude', 'price', 'seats'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => {
      const newFeatures = prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature];
      setFormData(prevData => ({
        ...prevData,
        features: newFeatures
      }));
      return newFeatures;
    });
  };


  const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);

    const uploadedUrls: string[] = [];

    for (const file of files){
        const response = await uploadImageMutation.mutateAsync(file);
        uploadedUrls.push(response.url);
    }
    // if(!files) return;
    // const fileArray = Array.from(files);

    console.log("uploadedUrls", uploadedUrls)

    setFormData(prev => ({
        ...prev,
        images: uploadedUrls,
        preview_image: uploadedUrls[0],
    }))

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.name || !formData.plate_number || !formData.location || formData.price <= 0) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const payload = {
        owner: user.id, 

        name: formData.name,
        plate_number: formData.plate_number,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        price: formData.price,
        seats: formData.seats,
        transmission: formData.transmission,
        fuel: formData.fuel,
        instant_book: formData.instant_book,

        preview_image: formData.preview_image, 

        images: formData.images.map(() => ({
          image_url: formData.preview_image, 
        })),
        features: selectedFeatures.map(feature => ({ feature })),
      };

      console.log('FINAL PAYLOAD:', payload);
      createCarMutation.mutate(payload);

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        plate_number: '',
        location: '',
        latitude: 0,
        longitude: 0,
        price: 0,
        seats: 4,
        transmission: 'automatic',
        fuel: 'gasoline',
        instant_book: false,
        features: [],
        images: [],
        preview_image: '',
      });
      setSelectedFeatures([]);
      router.push("/explore-cars");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Car Listing</CardTitle>
        <CardDescription>
          Listing by {user.username} ({user.email})
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md">
            <p className="text-destructive">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700">Car listing created successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Car Name *</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="e.g., Toyota Prius"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Plate Number *</label>
                <Input
                  type="text"
                  name="plate_number"
                  placeholder="e.g., CAR001"
                  value={formData.plate_number}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price (per day) *</label>
                <Input
                  type="number"
                  name="price"
                  placeholder="35.50"
                  step="0.01"
                  min="0"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location *</label>
                <Input
                  type="text"
                  name="location"
                  placeholder="e.g., Yangon"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Latitude</label>
                <Input
                  type="number"
                  name="latitude"
                  placeholder="16.8409"
                  step="0.0001"
                  value={formData.latitude || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Longitude</label>
                <Input
                  type="number"
                  name="longitude"
                  placeholder="96.1735"
                  step="0.0001"
                  value={formData.longitude || ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vehicle Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Seats</label>
                <Input
                  type="number"
                  name="seats"
                  min="1"
                  max="12"
                  value={formData.seats}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fuel Type</label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="petrol">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div className="space-y-2 flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="instant_book"
                    checked={formData.instant_book}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Enable Instant Book</span>
                </label>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_FEATURES.map(feature => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Images</label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {formData.preview_image && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Preview Image:</p>
                  <img
                    src={formData.preview_image}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Owner Information (Read-only) */}
          <div className="space-y-4 p-4 bg-muted rounded-md">
            <h3 className="text-lg font-semibold">Owner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{user.location}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating Listing...' : 'Create Car Listing'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
