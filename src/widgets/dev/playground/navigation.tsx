import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

import { PlaygroundSection } from "./section";

export function NavigationSection() {
  return (
    <PlaygroundSection
      id="nav"
      title="Navigation"
      description="Tabs, pagination."
    >
      <div className="space-y-6">
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Account</TabsTrigger>
            <TabsTrigger value="tab-2">Password</TabsTrigger>
            <TabsTrigger value="tab-3">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1" className="text-sm text-foreground">
            Account settings.
          </TabsContent>
          <TabsContent value="tab-2" className="text-sm text-foreground">
            Password settings.
          </TabsContent>
          <TabsContent value="tab-3" className="text-sm text-foreground">
            Team settings.
          </TabsContent>
        </Tabs>

        <Separator />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </PlaygroundSection>
  );
}
