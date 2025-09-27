import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FarmerProfile } from '@/types/farmer';
import { toast } from '@/hooks/use-toast';

const districts = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
  'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram',
  'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
];

const crops = [
  'Paddy', 'Coconut', 'Rubber', 'Spices (Pepper)', 'Spices (Cardamom)',
  'Tea', 'Coffee', 'Banana', 'Tapioca', 'Vegetables'
];

export default function Profile() {
  const navigate = useNavigate();
  const [farmerProfile, setFarmerProfile] = useLocalStorage<FarmerProfile | null>('farmerProfile', null);
  
  const [formData, setFormData] = useState({
    name: farmerProfile?.name || '',
    district: farmerProfile?.district || '',
    crop: farmerProfile?.crop || '',
    phone: farmerProfile?.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.district || !formData.crop) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const profile: FarmerProfile = {
      id: farmerProfile?.id || Date.now().toString(),
      name: formData.name,
      district: formData.district,
      crop: formData.crop,
      phone: formData.phone,
      registeredAt: farmerProfile?.registeredAt || new Date()
    };

    setFarmerProfile(profile);
    
    toast({
      title: "Profile Updated",
      description: "Your farmer profile has been saved successfully",
      variant: "default"
    });

    if (!farmerProfile) {
      // First time setup, redirect to home
      navigate('/');
    }
  };

  return (
    <Layout title="Farmer Profile">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {farmerProfile ? 'Update Profile' : 'Create Farmer Profile'}
            </CardTitle>
            <CardDescription>
              {farmerProfile 
                ? 'Update your information to get better personalized advice'
                : 'Set up your profile to get personalized agricultural assistance'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">Primary Crop *</Label>
                <Select
                  value={formData.crop}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, crop: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>

              <Button type="submit" className="w-full">
                {farmerProfile ? 'Update Profile' : 'Create Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}