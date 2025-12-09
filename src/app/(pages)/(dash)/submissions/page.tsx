import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SubmissionsPage = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Tabs Variants Demo</h1>

      {/* Default Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Default Variant</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Underline Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Underline Variant</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" variant="underline" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview content area.</TabsContent>
            <TabsContent value="analytics">
              Analytics dashboard view.
            </TabsContent>
            <TabsContent value="reports">
              Downloadable reports section.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Pills Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Pills Variant</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="music" variant="pills" className="w-full">
            <TabsList>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
            </TabsList>
            <TabsContent value="music">
              Listen to your favorite tracks.
            </TabsContent>
            <TabsContent value="podcasts">
              Catch up on latest episodes.
            </TabsContent>
            <TabsContent value="live">Join live sessions.</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Outline Variant */}
      <Card>
        <CardHeader>
          <CardTitle>Outline Variant</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit" variant="outline" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">Editor mode active.</TabsContent>
            <TabsContent value="preview">Previewing changes.</TabsContent>
            <TabsContent value="history">View version history.</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <h1 className="text-3xl font-bold pt-8">Badge Variants Demo</h1>
      <Card>
        <CardHeader>
          <CardTitle>Badge Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive-outline">Destructive Outline</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badge Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="default">Default</Badge>
          <Badge size="lg">Large</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsPage;
